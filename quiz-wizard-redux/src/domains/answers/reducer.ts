import {createReducer} from '@reduxjs/toolkit'

import {deleting, fulfilled, fulfilledResourceMap, getId, pending, rejected} from '../../helpers'

import {checkQuiz, deleteAnswer, fetchAnswer, fetchAnswers} from './actions'
import {AnswersState} from './state'

const initialState: AnswersState = {
  ids: {status: 'pending'},
  data: {}
}

export const answersReducer = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      fetchAnswers.pending,
      (state) => {
        state.ids = pending(state.ids)
      }
    )
    .addCase(
      fetchAnswers.fulfilled,
      (state, action) => {
        state.ids = fulfilled(state.ids, action.payload.map(getId))
        state.data = fulfilledResourceMap(state.data, action.payload)
      }
    )
    .addCase(
      fetchAnswers.rejected,
      (state, action) => {
        state.ids = rejected(state.ids, action.error)
      }
    )
    .addCase(
      fetchAnswer.pending,
      (state, action) => {
        const answerId = action.meta.arg
        state.data[answerId] = pending(state.data[answerId])
      }
    )
    .addCase(
      fetchAnswer.fulfilled,
      (state, action) => {
        const {id: answerId} = action.payload
        state.data[answerId] = fulfilled(state.data[answerId], action.payload)
        state.ids.data = Array.from(
          new Set([...(state.ids.data ?? []), answerId])
        )
      }
    )
    .addCase(
      fetchAnswer.rejected,
      (state, action) => {
        const answerId = action.meta.arg
        state.data[answerId] = rejected(state.data[answerId], action.error)
      }
    )
    .addCase(
      deleteAnswer.pending,
      (state, action) => {
        const answerId = action.meta.arg
        state.data[answerId] = deleting(state.data[answerId])
      }
    )
    .addCase(
      deleteAnswer.fulfilled,
      (state, action) => {
        const answerId = action.meta.arg
        delete state.data[answerId]
        state.ids.data = state.ids.data?.filter(
          (id) => id !== answerId
        )
      }
    )
    .addCase(
      deleteAnswer.rejected,
      (state, action) => {
        const answerId = action.meta.arg
        state.data[answerId] = rejected(state.data[answerId], action.error)
      }
    )
    .addCase(
      checkQuiz.pending,
      (state, action) => {
        const {quizId} = action.meta.arg
        state.checkingQuizId = quizId
      }
    )
    .addCase(
      checkQuiz.fulfilled,
      (state, action) => {
        delete state.checkingQuizId
        const {id: answerId} = action.payload
        state.data[answerId] = fulfilled(state.data[answerId], action.payload)
        state.ids.data = Array.from(
          new Set([...(state.ids.data ?? []), answerId])
        )
      }
    )
    .addCase(
      checkQuiz.rejected,
      (state) => {
        delete state.checkingQuizId
      }
    )
)
