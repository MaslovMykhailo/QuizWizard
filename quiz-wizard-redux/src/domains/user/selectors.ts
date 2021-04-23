import {createSelector} from '@reduxjs/toolkit'

import type {State} from '../../store'

export const selectUserState = (state: State) => state.user

export const selectUser = createSelector(
  selectUserState,
  (state) => state.data
)

export const selectUserStatus = createSelector(
  selectUserState,
  (state) => state.status
)

export const selectIsUserAuthorized = createSelector(
  selectUser,
  selectUserStatus,
  (user, status) => user && status.isAuthorized
)

export const selectIsUserAuthorizing = createSelector(
  selectUserStatus,
  (status) => status.isAuthorizing
)

export const selectIsUserSigningOut = createSelector(
  selectUserStatus,
  (status) => status.isSigningOut
)

export const selectIsUserDataFetching = createSelector(
  selectUserStatus,
  (status) => status.isFetching
)

export const selectIsUserDataUpdating = createSelector(
  selectUserStatus,
  (status) => status.isUpdating
)
