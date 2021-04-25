import flow from 'lodash/flow'
import {createSelector} from '@reduxjs/toolkit'
import {GroupId} from 'quiz-wizard-schema'

import {getData, isPending, isPresent} from '../../helpers'
import type {State} from '../../store'

export const selectGroupsState = (state: State) => state.groups

export const selectGroupIdsResource = createSelector(
  selectGroupsState,
  (groupsState) => groupsState.ids
)

export const selectIsGroupsFetching = createSelector(
  selectGroupIdsResource,
  isPending
)

export const selectGroupsData = createSelector(
  selectGroupsState,
  (groupsState) => groupsState.data
)

export const selectGroupResources = createSelector(
  selectGroupsData,
  (data) => Object.values(data).filter(isPresent)
)

export const selectGroupResourceGetter = createSelector(
  selectGroupsData,
  (data) => (groupId: GroupId) => data[groupId]
)

export const selectGroupGetter = createSelector(
  selectGroupResourceGetter,
  (resourceGetter) => flow(resourceGetter, getData)
)

export const selectGroupNameGetter = createSelector(
  selectGroupGetter,
  (groupGetter) => flow(groupGetter, (group) => group?.name)
)
