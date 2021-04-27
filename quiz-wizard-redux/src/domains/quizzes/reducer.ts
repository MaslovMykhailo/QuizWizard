import {createReducer} from '@reduxjs/toolkit'

import {creating, deleting, fulfilled, fulfilledResourceMap, getId, pending, rejected} from '../../helpers'

import {createQuiz, deleteQuiz, fetchQuiz, fetchQuizzes} from './actions'
import {QuizzesState} from './state'

const initialState: QuizzesState = {
  ids: {status: 'pending'},
  data: {}
}

export const quizzesReducer = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      fetchQuizzes.pending,
      (state) => {
        state.ids = pending(state.ids)
      }
    )
    .addCase(
      fetchQuizzes.fulfilled,
      (state, action) => {
        state.ids = fulfilled(state.ids, action.payload.map(getId))
        state.data = fulfilledResourceMap(state.data, action.payload)
      }
    )
    .addCase(
      fetchQuizzes.rejected,
      (state, action) => {
        state.ids = rejected(state.ids, action.error)
      }
    )
    .addCase(
      fetchQuiz.pending,
      (state, action) => {
        const quizId = action.meta.arg
        state.data[quizId] = pending(state.data[quizId])
      }
    )
    .addCase(
      fetchQuiz.fulfilled,
      (state, action) => {
        const {id: quizId} = action.payload
        state.data[quizId] = fulfilled(state.data[quizId], action.payload)
        state.ids.data = Array.from(
          new Set([...(state.ids.data ?? []), quizId])
        )
      }
    )
    .addCase(
      fetchQuiz.rejected,
      (state, action) => {
        const quizId = action.meta.arg
        state.data[quizId] = rejected(state.data[quizId], action.error)
      }
    )
    .addCase(
      createQuiz.pending,
      (state, action) => {
        const {id: quizId} = action.meta.arg
        state.data[quizId] = creating(state.data[quizId])
      }
    )
    .addCase(
      createQuiz.fulfilled,
      (state, action) => {
        const {id: quizId} = action.payload
        state.data[quizId] = fulfilled(state.data[quizId], action.payload)
        state.ids.data = Array.from(
          new Set([...(state.ids.data ?? []), quizId])
        )
      }
    )
    .addCase(
      createQuiz.rejected,
      (state, action) => {
        const {id: quizId} = action.meta.arg
        state.data[quizId] = rejected(state.data[quizId], action.error)
      }
    )
    .addCase(
      deleteQuiz.pending,
      (state, action) => {
        const quizId = action.meta.arg
        state.data[quizId] = deleting(state.data[quizId])
      }
    )
    .addCase(
      deleteQuiz.fulfilled,
      (state, action) => {
        const quizId = action.meta.arg
        delete state.data[quizId]
        state.ids.data = state.ids.data?.filter(
          (id) => id !== quizId
        )
      }
    )
    .addCase(
      deleteQuiz.rejected,
      (state, action) => {
        const quizId = action.meta.arg
        state.data[quizId] = rejected(state.data[quizId], action.error)
      }
    )
)
