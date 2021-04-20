import {PreferencesSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods, parseToken} from '../../../helpers'
import {DEFAULT_PREFERENCES} from '../default'
import {PreferencesService} from '../types'

import {data} from './data'

export const createInMemoryPreferencesService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  defaultPreferences = DEFAULT_PREFERENCES,
  localStoragePreferencesKey = 'local-preferences',
  inMemoryPreferencesStorageKey = 'in-memory-preferences',
  latency = 750
): PreferencesService => {
  let inMemoryPreferences = {...data}

  const getInMemoryPreferences = (email: string) =>
    inMemoryPreferences[email] || defaultPreferences

  const syncPreferencesWithStorage = () => storage
    .getData<Record<string, PreferencesSchema>>(inMemoryPreferencesStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryPreferencesStorageKey,
        inMemoryPreferences = {...data, ...inMemoryPreferences}
      )
    )

  const getLocalPreferences = () =>
    storage.getData<PreferencesSchema>(localStoragePreferencesKey)
      .then(preferences => preferences || defaultPreferences)

  const setLocalPreferences = (preferences: PreferencesSchema) =>
    storage.setData<PreferencesSchema>(localStoragePreferencesKey, preferences)

  const getPreferences = () => authLayer.withAccessToken(
    (token) => {
      const {email} = parseToken(token)
      inMemoryPreferences[email] = getInMemoryPreferences(email)
      return syncPreferencesWithStorage()
        .then(() => inMemoryPreferences[email])
    }
  )

  const patchPreferences = (preferences: Partial<PreferencesSchema>) => authLayer.withAccessToken(
    (token) => {
      const {email} = parseToken(token)
      inMemoryPreferences[email] = {...getInMemoryPreferences(email), ...preferences}
      return syncPreferencesWithStorage()
        .then(() => inMemoryPreferences[email])
    }
  )

  return {
    ...delayMethods(
      {
        getPreferences,
        patchPreferences
      },
      latency
    ),
    getLocalPreferences,
    setLocalPreferences
  }
}
