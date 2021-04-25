import flow from 'lodash/flow'
import {createSelector} from '@reduxjs/toolkit'
import {GroupId} from 'quiz-wizard-schema'

import {getData, isDeleting, isPending, isPresent, newResourceId} from '../../helpers'
import type {State} from '../../store'

export const selectGroupsState = (state: State) => state.groups

export const selectGroupIdsResource = createSelector(
  selectGroupsState,
  (groupsState) => groupsState.ids
)

export const selectGroupIds = createSelector(
  selectGroupIdsResource,
  getData
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

export const selectGroups = createSelector(
  selectGroupResources,
  (resources) => resources.map(getData).filter(isPresent)
)

export const selectGroupsInfo = createSelector(
  selectGroupResources,
  (resources) => resources.map((resource) => getData(resource) && ({
    ...getData(resource)!,
    isFetching: isPending(resource),
    isDeleting: isDeleting(resource)
  }))
    .filter(isPresent)
)

export const selectGroupResourceGetter = createSelector(
  selectGroupsData,
  (data) => (groupId: GroupId) => data[groupId]
)

export const selectIsGroupFetchingGetter = createSelector(
  selectGroupResourceGetter,
  (resourceGetter) => flow(resourceGetter, isPending)
)

export const selectIsGroupDeletingGetter = createSelector(
  selectGroupResourceGetter,
  (resourceGetter) => flow(resourceGetter, isDeleting)
)

export const selectGroupGetter = createSelector(
  selectGroupResourceGetter,
  (resourceGetter) => flow(resourceGetter, getData)
)

export const selectGroupNameGetter = createSelector(
  selectGroupGetter,
  (groupGetter) => flow(groupGetter, (group) => group?.name)
)

export const selectNewGroupResource = createSelector(
  selectGroupsData,
  (data) => data[newResourceId]
)

export const selectIsNewGroupCreating = createSelector(
  selectNewGroupResource,
  isPending
)
