import {createSelector} from '@reduxjs/toolkit'

import type {State} from '../../store'

export const selectUserState = (state: State) => state.user

export const selectUser = createSelector(
  selectUserState,
  (state) => state.data
)

export const selectUserAuthorizationStatus = createSelector(
  selectUserState,
  (state) => state.status
)

export const selectIsUserAuthorized = createSelector(
  selectUser,
  selectUserAuthorizationStatus,
  (user, status) => user && status.isAuthorized
)

export const selectIsUserAuthorizing = createSelector(
  selectUserAuthorizationStatus,
  (status) => status.isAuthorizing
)
