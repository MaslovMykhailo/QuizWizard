import {createReducer} from '@reduxjs/toolkit'

import {pending, fulfilled, rejected} from '../../helpers'

import {setPreferences, fetchPreferences, updatePreferences} from './actions'
import {PreferencesState} from './state'

const initialState: PreferencesState = {
  status: 'pending'
}

export const preferencesReducer = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      setPreferences,
      (state, action) => {
        state.data = action.payload
      }
    )
    .addMatcher(
      (action) => [fetchPreferences.pending.type, updatePreferences.pending.type].includes(action.type),
      (state) => pending(state)
    )
    .addMatcher(
      (action) => [fetchPreferences.fulfilled.type, updatePreferences.fulfilled.type].includes(action.type),
      (state, action) => fulfilled(state, action.payload)
    )
    .addMatcher(
      (action) => [fetchPreferences.rejected.type, updatePreferences.rejected.type].includes(action.type),
      (state, action) => rejected(state, action.error)
    )
)
