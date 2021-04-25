import {v4 as uuid} from 'uuid'
import merge from 'lodash/merge'
import {GroupId, GroupSchema, NewGroupSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods} from '../../../helpers'
import {GroupsService} from '../types'

import {initialData} from './initial-data'

export const createInMemoryGroupsService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  inMemoryGroupsStorageKey = 'in-memory-groups',
  latency = 750
): GroupsService => {
  let inMemoryGroups = {...initialData}

  const syncGroupsWithStorage = (override = false) => storage
    .getData<typeof inMemoryGroups>(inMemoryGroupsStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryGroupsStorageKey,
        inMemoryGroups = override ? inMemoryGroups : merge(data, inMemoryGroups)
      )
    )

  syncGroupsWithStorage()

  const getGroup = (groupId: GroupId) => syncGroupsWithStorage()
    .then(() => authLayer.withAccessToken(async () => inMemoryGroups[groupId]))

  const updateGroup = (groupId: GroupId, group: Partial<GroupSchema>) =>
    authLayer.withAccessToken(() => {
      inMemoryGroups[groupId] = {...inMemoryGroups[groupId], ...group}
      return syncGroupsWithStorage().then(() => inMemoryGroups[groupId])
    })

  const createGroup = (group: NewGroupSchema) => {
    const groupId = uuid()
    return updateGroup(groupId, {...group, id: groupId})
  }

  const deleteGroup = (groupId: GroupId) =>
    authLayer.withAccessToken(() => {
      delete inMemoryGroups[groupId]
      return syncGroupsWithStorage(true)
    })

  const getGroups = () => syncGroupsWithStorage()
    .then(() => Object.values(inMemoryGroups))

  return delayMethods(
    {
      getGroup,
      updateGroup,
      createGroup,
      deleteGroup,
      getGroups
    },
    latency
  )
}
