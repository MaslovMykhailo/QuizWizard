import {createReducer} from '@reduxjs/toolkit'

import {authorizeUser, fetchUserData, setUser, signOut, updateUserData} from './actions'
import {UserState} from './state'

const initialState: UserState = {
  status: {
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
    .addCase(signOut.pending, (state) => {
      state.status.isSigningOut = true
    })
    .addCase(signOut.fulfilled, (state) => {
      state.status.isAuthorized = false
      state.status.isAuthorizing = false
      state.status.isSigningOut = false
      delete state.data
    })
    .addCase(signOut.rejected, (state, action) => {
      state.status.isAuthorizing = false
      state.status.isSigningOut = false
      state.error = action.error
    })
    .addCase(setUser, (state, {payload}) => {
      state.data = payload
      state.status = {
        isAuthorized: Boolean(payload),
        isAuthorizing: false
      }
    })
    .addCase(fetchUserData.pending, (state) => {
      state.status.isFetching = true
    })
    .addCase(fetchUserData.fulfilled, (state, action) => {
      state.status.isFetching = false
      state.data = action.payload
      delete state.error
    })
    .addCase(fetchUserData.rejected, (state, action) => {
      state.status.isFetching = false
      state.error = action.error
    })
    .addCase(updateUserData.pending, (state) => {
      state.status.isUpdating = true
    })
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.status.isUpdating = false
      state.data = action.payload
      delete state.error
    })
    .addCase(updateUserData.rejected, (state, action) => {
      state.status.isUpdating = false
      state.error = action.error
    })
)
