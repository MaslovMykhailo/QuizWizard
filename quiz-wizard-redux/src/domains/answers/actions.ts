import {AnswerId, QuizId} from 'quiz-wizard-schema'

import {createAsyncThunkAction} from '../../common'

export const fetchAnswers = createAsyncThunkAction(
  'FetchAnswers',
  (_, {extra: {services}}) =>
    services.answers.getAnswers()
)

export const fetchAnswer = createAsyncThunkAction(
  'FetchAnswer',
  (answerId: AnswerId, {extra: {services}}) =>
    services.answers.getAnswer(answerId)
)

export const deleteAnswer = createAsyncThunkAction(
  'DeleteAnswer',
  (answerId: AnswerId, {extra: {services}}) =>
    services.answers.deleteAnswer(answerId)
)

export const checkQuiz = createAsyncThunkAction(
  'CheckQuiz',
  ({quizId, sheet}: {quizId: QuizId, sheet: string | Blob}, {extra: {services}}) =>
    services.answers.checkQuiz(quizId, sheet)
)
