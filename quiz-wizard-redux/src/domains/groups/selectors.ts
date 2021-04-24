import {createSelector} from '@reduxjs/toolkit'

import {isPending} from '../../helpers'
import type {State} from '../../store'

export const selectGroupsState = (state: State) => state.groups

export const selectGroupIdsResource = createSelector(
  selectGroupsState,
  groupsState => groupsState.ids
)

export const selectIsGroupsFetching = createSelector(
  selectGroupIdsResource,
  isPending
)
