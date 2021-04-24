import {GroupId, GroupSchema, NewGroupSchema} from 'quiz-wizard-schema'

import {createAsyncThunkAction} from '../../common'

export const fetchGroups = createAsyncThunkAction(
  'FetchGroups',
  (_, {extra: {services}}) =>
    services.groups.getGroups()
)

export const fetchGroup = createAsyncThunkAction(
  'FetchGroup',
  (groupId: GroupId, {extra: {services}}) =>
    services.groups.getGroup(groupId)
)

export const updateGroup = createAsyncThunkAction(
  'UpdateGroup',
  (group: GroupSchema, {extra: {services}}) =>
    services.groups.updateGroup(group.id, group)
)

export const createGroup = createAsyncThunkAction(
  'CreateGroup',
  (group: NewGroupSchema, {extra: {services}}) =>
    services.groups.createGroup(group)
)

export const deleteGroup = createAsyncThunkAction(
  'DeleteGroup',
  (groupId: GroupId, {extra: {services}}) =>
    services.groups.deleteGroup(groupId)
)

