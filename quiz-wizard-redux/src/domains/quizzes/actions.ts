import {NewQuizSchema, QuizId} from 'quiz-wizard-schema'

import {createAsyncThunkAction} from '../../common'

export const fetchQuizzes = createAsyncThunkAction(
  'FetchQuizzes',
  (_, {extra: {services}}) =>
    services.quizzes.getQuizzes()
)

export const fetchQuiz = createAsyncThunkAction(
  'FetchQuiz',
  (quizId: QuizId, {extra: {services}}) =>
    services.quizzes.getQuiz(quizId)
)

export const createQuiz = createAsyncThunkAction(
  'CreateQuiz',
  (quiz: NewQuizSchema, {extra: {services}}) =>
    services.quizzes.createQuiz(quiz)
)

export const deleteQuiz = createAsyncThunkAction(
  'DeleteQuiz',
  (quizId: QuizId, {extra: {services}}) =>
    services.quizzes.deleteQuiz(quizId)
)

