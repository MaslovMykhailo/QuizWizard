import merge from 'lodash/merge'
import {AnswerId, AnswerSchema, QuizId} from 'quiz-wizard-schema'

import {delayMethods} from '../../../helpers'
import {AuthLayer, UploadLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {AnswersService} from '../types'

import {initialData} from './initial-data'

export const createInMemoryAnswersService = (
  authLayer: AuthLayer,
  uploadLayer: UploadLayer,
  storage: PersistentStorage,
  inMemoryAnswersStorageKey = 'in-memory-answers',
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

  const checkQuiz = (quizId: QuizId, sheet: Blob): Promise<AnswerSchema> =>
    Promise.reject('Not implemented')

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
