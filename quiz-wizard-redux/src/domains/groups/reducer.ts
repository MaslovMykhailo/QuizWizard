import {createReducer} from '@reduxjs/toolkit'

import {fulfilled, getId, pending, fulfilledResourceMap, rejected, newResourceId, deleting} from '../../helpers'

import {createGroup, deleteGroup, fetchGroup, fetchGroups, updateGroup} from './actions'
import {GroupsState} from './state'

const initialState: GroupsState = {
  data: {},
  ids: {status: 'pending'}
}

export const groupsReduces = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      fetchGroups.pending,
      (state) => {
        state.ids = pending(state.ids)
      }
    )
    .addCase(
      fetchGroups.fulfilled,
      (state, action) => {
        state.ids = fulfilled(state.ids, action.payload.map(getId))
        state.data = fulfilledResourceMap(state.data, action.payload)
      }
    )
    .addCase(
      fetchGroups.rejected,
      (state, action) => {
        state.ids = rejected(state.ids, action.error)
      }
    )
    .addCase(
      fetchGroup.pending,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = pending(state.data[groupId])
      }
    )
    .addCase(
      fetchGroup.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = fulfilled(state.data[groupId], action.payload)
      }
    )
    .addCase(
      fetchGroup.rejected,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )
    .addCase(
      updateGroup.pending,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = pending(state.data[groupId])
      }
    )
    .addCase(
      updateGroup.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = fulfilled(state.data[groupId], action.payload)
      }
    )
    .addCase(
      updateGroup.rejected,
      (state, action) => {
        const groupId = action.meta.arg.id
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )
    .addCase(
      createGroup.pending,
      (state) => {
        state.data[newResourceId] = pending(state.data[newResourceId])
      }
    )
    .addCase(
      createGroup.fulfilled,
      (state, action) => {
        delete state.data[newResourceId]
        state.data[action.payload.id] = fulfilled(state.data[action.payload.id], action.payload)
        state.ids.data?.push(action.payload.id)
      }
    )
    .addCase(
      createGroup.rejected,
      (state, action) => {
        state.data[newResourceId] = rejected(state.data[newResourceId], action.error)
      }
    )
    .addCase(
      deleteGroup.pending,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = deleting(state.data[groupId])
      }
    )
    .addCase(
      deleteGroup.fulfilled,
      (state, action) => {
        const groupId = action.meta.arg
        delete state.data[groupId]
        state.ids.data = state.ids.data?.filter((id) => id !== groupId)
      }
    )
    .addCase(
      deleteGroup.rejected,
      (state, action) => {
        const groupId = action.meta.arg
        state.data[groupId] = rejected(state.data[groupId], action.error)
      }
    )

)
