import {createSelector} from '@reduxjs/toolkit'
import {DEFAULT_PREFERENCES} from 'quiz-wizard-client'

import type {State} from '../../store'
import {getData, isPending, isFulfilled} from '../../helpers'

export const selectPreferencesState = (state: State) => state.preferences

export const selectPreferencesData = createSelector(
  selectPreferencesState,
  getData
)

export const selectPreferences = createSelector(
  selectPreferencesState,
  resource => getData(resource) || DEFAULT_PREFERENCES
)

export const arePreferencesPending = createSelector(
  selectPreferencesState,
  isPending
)

export const selectArePreferencesFulfilled = createSelector(
  selectPreferencesState,
  isFulfilled
)

export const selectArePreferencesInitializing = createSelector(
  selectPreferencesData,
  arePreferencesPending,
  (data, isPending) => !data && isPending
)

export const selectThemeType = createSelector(
  selectPreferences,
  (preferences) => preferences.theme
)

export const selectLanguage = createSelector(
  selectPreferences,
  (preferences) => preferences.language
)
