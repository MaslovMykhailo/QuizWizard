import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import {NewQuizSchema, QuizId, QuestionSchema, QuestionId} from 'quiz-wizard-schema'

import {AuthLayer, UploadLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods} from '../../../helpers'
import {QuizzesService} from '../types'

import {initialData} from './initial-data'

export const createInMemoryQuizzesService = (
  authLayer: AuthLayer,
  uploadLayer: UploadLayer,
  storage: PersistentStorage,
  inMemoryQuizzesStorageKey = 'in-memory-quizzes',
  latency = 750
): QuizzesService => {
  let inMemoryQuizzes = {...initialData}

  const syncQuizzesWithStorage = (override = false) => storage
    .getData<typeof inMemoryQuizzes>(inMemoryQuizzesStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryQuizzesStorageKey,
        inMemoryQuizzes = override ? inMemoryQuizzes : merge(data, inMemoryQuizzes)
      )
    )

  syncQuizzesWithStorage()

  const getQuiz = (quizId: QuizId) => syncQuizzesWithStorage()
    .then(() => authLayer.withAccessToken(async () => inMemoryQuizzes[quizId]))

  const createQuiz = async (quiz: NewQuizSchema) => {
    const pictureUrls = await Promise.all(
      Object.values(quiz.questions).map(
        ({id, picture}) => picture ?
          uploadLayer.uploadQuestionPicture(picture).then((url) => [id, url]) :
          Promise.resolve([id, undefined])
      )
    )

    const questions = pictureUrls.reduce<Record<QuestionId, QuestionSchema>>(
      (map, [id, picture]) => {
        map[id!] = {...quiz.questions[id!], picture}
        return map
      },
      {}
    )

    inMemoryQuizzes[quiz.id] = {
      ...cloneDeep(quiz),
      creationDate: new Date().toISOString(),
      questions
    }

    return getQuiz(quiz.id)
  }

  const deleteQuiz = (quizId: QuizId) =>
    authLayer.withAccessToken(() => {
      delete inMemoryQuizzes[quizId]
      return syncQuizzesWithStorage(true)
    })

  const getQuizzes = () => syncQuizzesWithStorage()
    .then(() => Object.values(inMemoryQuizzes))

  return delayMethods(
    {
      getQuiz,
      createQuiz,
      deleteQuiz,
      getQuizzes
    },
    latency
  )
}
