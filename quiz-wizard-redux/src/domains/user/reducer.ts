import {createReducer} from '@reduxjs/toolkit'

import {authorizeUser, setUser} from './actions'
import {UserState} from './state'

const initialState: UserState = {
  status: {
    isAuthorized: false,
    isAuthorizing: true
  }
}

export const userReducer = createReducer(
  initialState,
  (builder) => builder
    .addCase(authorizeUser.pending, (state) => {
      state.status.isAuthorizing = true
    })
    .addCase(authorizeUser.fulfilled, (state, {payload}) => {
      state.data = payload
      state.status = {
        isAuthorized: true,
        isAuthorizing: false
      }
    })
    .addCase(authorizeUser.rejected, (state) => {
      delete state.data
      state.status = {
        isAuthorized: false,
        isAuthorizing: false
      }
    })
    .addCase(setUser, (state, {payload}) => {
      state.data = payload
      state.status = {
        isAuthorized: Boolean(payload),
        isAuthorizing: false
      }
    })
)
