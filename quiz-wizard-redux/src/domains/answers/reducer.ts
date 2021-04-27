import {createReducer} from '@reduxjs/toolkit'

import {fulfilled, fulfilledResourceMap, getId, pending, rejected} from '../../helpers'

import {fetchAnswers} from './actions'
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
)
