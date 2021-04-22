import {UserSchema} from 'quiz-wizard-schema'

import {delayMethods, parseToken} from '../../../helpers'
import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {UserService} from '../types'

import {data} from './data'

export const createInMemoryUserService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  inMemoryUserDataStorageKey = 'in-memory-user-data',
  latency = 750
): UserService => {
  let inMemoryUserData = {...data}

  const syncUserDataWithStorage = () => storage
    .getData<Record<string, UserSchema>>(inMemoryUserDataStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryUserDataStorageKey,
        inMemoryUserData = {...data, ...inMemoryUserData}
      )
    )

  syncUserDataWithStorage()

  const getUserData = () => syncUserDataWithStorage()
    .then(() => authLayer.withAccessToken(async (token) => {
      const {email} = parseToken(token)
      return inMemoryUserData[email]
    }))

  const updateUserData = (userData: Partial<UserSchema>) =>
    authLayer.withAccessToken((token) => {
      const {email} = parseToken(token)
      inMemoryUserData[email] = {...inMemoryUserData[email], ...userData}
      return syncUserDataWithStorage().then(() => inMemoryUserData[email])
    })

  return delayMethods(
    {
      getUserData,
      updateUserData
    },
    latency
  )
}
