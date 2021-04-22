import noop from 'lodash/noop'
import {createAction} from '@reduxjs/toolkit'
import {Language, PreferencesSchema} from 'quiz-wizard-schema'

import {createAsyncThunkAction, createThunkAction} from '../../common'

import {selectPreferences, selectThemeType} from './selectors'

export const setPreferences = createAction<Partial<PreferencesSchema>>('SetPreferences')

export const fetchPreferences = createAsyncThunkAction(
  'FetchPreferences',
  (local: boolean | undefined = false, {extra: {services}}) => local ?
    services.preferences.getLocalPreferences() :
    services.preferences.getPreferences()
)

export const updatePreferences = createAsyncThunkAction(
  'UpdatePreferences',
  (preferences: Partial<PreferencesSchema>, {dispatch, getState, extra: {services}}) => {
    dispatch(setPreferences(preferences))
    const patchedPreferences = {...selectPreferences(getState()), ...preferences}
    return Promise
      .all([
        services.preferences.patchPreferences(preferences),
        services.preferences.setLocalPreferences(patchedPreferences)
      ])
      .then(([preferences]) => preferences)
  }
)

export const syncPreferencesInBackground = createThunkAction(() =>
  (_, getState, {services}) => {
    requestAnimationFrame(() => {
      const preferences = selectPreferences(getState())
      Promise
        .all([
          services.preferences.patchPreferences(preferences),
          services.preferences.setLocalPreferences(preferences)
        ]).catch(noop)
    })
  }
)

export const toggleTheme = createThunkAction(() =>
  (dispatch, getState) => {
    const theme = selectThemeType(getState())
    const themePreferences = {
      theme: theme === 'light' ?
        'dark' as const :
        'light' as const
    }
    dispatch(setPreferences(themePreferences))
    return dispatch(syncPreferencesInBackground())
  }
)

export const changeLanguage = createThunkAction((language: Language) =>
  (dispatch) => {
    const languagePreferences = {language}
    dispatch(setPreferences(languagePreferences))
    return dispatch(syncPreferencesInBackground())
  }
)
