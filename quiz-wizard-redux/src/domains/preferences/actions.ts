import {createAction} from '@reduxjs/toolkit'
import {PreferencesSchema} from 'quiz-wizard-schema'

import {createThunkAction} from '../../common'

import {selectPreferences} from './selectors'

export const setPreferences = createAction<PreferencesSchema>('SetPreferences')

export const fetchPreferences = createThunkAction(
  'FetchPreferences',
  (local: boolean | undefined = false, {extra: {services}}) => local ?
    services.preferences.getLocalPreferences() :
    services.preferences.getPreferences()
)

export const updatePreferences = createThunkAction(
  'UpdatePreferences',
  (preferences: Partial<PreferencesSchema>, {dispatch, getState, extra: {services}}) => {
    const patchedPreferences = {...selectPreferences(getState()), ...preferences}
    dispatch(setPreferences((patchedPreferences)))
    return Promise
      .all([
        services.preferences.setLocalPreferences(patchedPreferences),
        services.preferences.patchPreferences(preferences)
      ])
  }
)
