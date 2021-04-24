import merge from 'lodash/merge'
import {PreferencesSchema} from 'quiz-wizard-schema'

import {AuthLayer} from '../../../layers'
import {PersistentStorage} from '../../../storages'
import {delayMethods, parseToken} from '../../../helpers'
import {DEFAULT_PREFERENCES} from '../default'
import {PreferencesService} from '../types'

import {initialData} from './initial-data'

export const createInMemoryPreferencesService = (
  authLayer: AuthLayer,
  storage: PersistentStorage,
  localStoragePreferencesKey = 'local-preferences',
  inMemoryPreferencesStorageKey = 'in-memory-preferences',
  latency = 750
): PreferencesService => {
  let inMemoryPreferences = {...initialData}

  const getInMemoryPreferences = (email: string) =>
    inMemoryPreferences[email] || DEFAULT_PREFERENCES

  const syncPreferencesWithStorage = () => storage
    .getData<Record<string, PreferencesSchema>>(inMemoryPreferencesStorageKey)
    .then(
      (data) => storage.setData(
        inMemoryPreferencesStorageKey,
        inMemoryPreferences = merge(data, inMemoryPreferences)
      )
    )

  syncPreferencesWithStorage()

  const getLocalPreferences = () => {
    const localPreferences = localStorage.getItem(localStoragePreferencesKey)
    return localPreferences ? JSON.parse(localPreferences) : DEFAULT_PREFERENCES
  }

  const setLocalPreferences = (preferences: PreferencesSchema) => {
    const localPreferences = JSON.stringify(preferences)
    localStorage.setItem(localStoragePreferencesKey, localPreferences)
  }

  const getPreferences = () => authLayer.withAccessToken(
    (token) => {
      const {email} = parseToken(token)
      inMemoryPreferences[email] = getInMemoryPreferences(email)
      return syncPreferencesWithStorage()
        .then(() => inMemoryPreferences[email])
    }
  )

  const updatePreferences = (preferences: Partial<PreferencesSchema>) => authLayer.withAccessToken(
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
        updatePreferences
      },
      latency
    ),
    getLocalPreferences,
    setLocalPreferences
  }
}
