import {PreferencesSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods, parseToken} from '../../../helpers'
import {DEFAULT_PREFERENCES} from '../default'
import {PreferencesService} from '../types'

import {data} from './data'

const preferencesStorageKey = 'preferences'

export const createInMemoryPreferencesService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  defaultPreferences = DEFAULT_PREFERENCES,
  latency = 750
): PreferencesService => {
  let inMemoryPreferences = {...data}

  const getInMemoryPreferences = (email: string) =>
    inMemoryPreferences[email] || defaultPreferences

  const syncPreferencesWithStorage = () => storage
    .getData<Record<string, PreferencesSchema>>(preferencesStorageKey)
    .then(
      (data) => storage.setData(
        preferencesStorageKey,
        inMemoryPreferences = {...data, ...inMemoryPreferences}
      )
    )

  const getPreferences = () => authLayer.withAccessToken(
    (token) => {
      const {email} = parseToken(token)
      inMemoryPreferences[email] = getInMemoryPreferences(email)
      return syncPreferencesWithStorage().then(() => inMemoryPreferences[email])
    }
  )

  const patchPreferences = (preferences: Partial<PreferencesSchema>) => authLayer.withAccessToken(
    (token) => {
      const {email} = parseToken(token)
      inMemoryPreferences[email] = {...getInMemoryPreferences(email), ...preferences}
      return syncPreferencesWithStorage().then(() => inMemoryPreferences[email])
    }
  )

  return delayMethods(
    {
      getPreferences,
      patchPreferences
    },
    latency
  )
}
