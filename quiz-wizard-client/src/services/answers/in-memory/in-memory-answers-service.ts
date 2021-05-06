import {v4 as uuid} from 'uuid'
import merge from 'lodash/merge'
import {AnswerId, AnswerSchema, QuizId, QuizSchema} from 'quiz-wizard-schema'

import {delayMethods} from '../../../helpers'
import {AuthLayer, RecognitionLayer, UploadLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {AnswersService} from '../types'

import {extractStudentId} from './extract-student-id'
import {checkQuizAnswers} from './check-quiz-answers'
import {calcCheckResult} from './calc-check-result'
import {initialData} from './initial-data'

export const createInMemoryAnswersService = (
  authLayer: AuthLayer,
  uploadLayer: UploadLayer,
  recognitionLayer: RecognitionLayer,
  storage: PersistentStorage,
  inMemoryAnswersStorageKey = 'in-memory-answers',
  inMemoryQuizzesStorageKey = 'in-memory-quizzes',
  latency = 750
): AnswersService => {
  let inMemoryAnswers = {...initialData}

  const syncAnswersWithStorage = (override = false) => storage
    .getData<typeof inMemoryAnswers>(inMemoryAnswersStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryAnswersStorageKey,
        inMemoryAnswers = override ? inMemoryAnswers : merge(data, inMemoryAnswers)
      )
    )

  syncAnswersWithStorage()

  const getAnswers = () => authLayer.withAccessToken(
    () => syncAnswersWithStorage().then(() => Object.values(inMemoryAnswers))
  )

  const getAnswer = (answerId: AnswerId) => authLayer.withAccessToken(
    () => syncAnswersWithStorage().then(() => inMemoryAnswers[answerId])
  )

  const deleteAnswer = (answerId: AnswerId) => authLayer.withAccessToken(
    () => {
      delete inMemoryAnswers[answerId]
      return syncAnswersWithStorage(true)
    }
  )

  const checkQuiz = async (
    quizId: QuizId,
    sheet: string | Blob
  ): Promise<AnswerSchema> => {
    const quizzes = await storage.getData<Record<QuizId, QuizSchema | undefined>>(inMemoryQuizzesStorageKey)
    const quiz = quizzes?.[quizId]

    if (!quiz) {
      return Promise.reject(`Unknown quiz: ${quizId}`)
    }

    const sheetUrl = await uploadLayer.uploadAnswerSheet(sheet)
    const recognition = await recognitionLayer.recognize(sheetUrl)

    const student = extractStudentId(recognition.student)
    const checks = checkQuizAnswers(quiz, recognition.answers)
    const result = calcCheckResult(quiz, checks)

    return {
      id: uuid(),
      creationDate: new Date().toISOString(),
      quiz: quizId,
      sheet: sheetUrl,
      checks,
      result,
      student
    }
  }

  return delayMethods(
    {
      getAnswers,
      getAnswer,
      deleteAnswer,
      checkQuiz
    },
    latency
  )
}
