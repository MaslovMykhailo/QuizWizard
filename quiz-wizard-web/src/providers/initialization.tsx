import {FC, ReactElement, useEffect, useState} from 'react'
import {
  authorizeUser,
  fetchPreferences,
  selectArePreferencesFulfilled,
  selectArePreferencesInitializing,
  selectIsUserAuthorizing,
  selectLanguage,
  useDispatch,
  useSelector
} from 'quiz-wizard-redux'
import {initLocalization} from 'quiz-wizard-localization'

import {InitialLoader} from '../components'

const useAuthorizationInit = () => {
  const dispatch = useDispatch()

  const isAuthorizing = useSelector(selectIsUserAuthorizing)
  const [isAuthorizedOnce, setIsAuthorizedOnce] = useState(false)

  useEffect(
    () => {
      dispatch(authorizeUser())
        .finally(() => setIsAuthorizedOnce(true))
    },
    [dispatch]
  )

  return isAuthorizing && !isAuthorizedOnce
}

const usePreferencesInit = () => {
  const dispatch = useDispatch()
  const areInitializing = useSelector(selectArePreferencesInitializing)

  useEffect(
    () => {
      dispatch(fetchPreferences(true))
    },
    [dispatch]
  )

  return areInitializing
}

const useLocalizationInit = () => {
  const language = useSelector(selectLanguage)

  const [isInitialized, setIsInitialized] = useState(false)
  const arePreferencesFulfilled = useSelector(selectArePreferencesFulfilled)

  useEffect(
    () => {
      if (!arePreferencesFulfilled || isInitialized) {
        return
      }

      initLocalization(language)
        .finally(() => setIsInitialized(true))
    },
    [arePreferencesFulfilled, isInitialized, language]
  )

  return !isInitialized
}

export const InitializationProvider: FC = ({children}) => {
  const isAuthorizing = useAuthorizationInit()
  const arePreferencesInitializing = usePreferencesInit()
  const isLocalizationInitializing = useLocalizationInit()

  if (
    isAuthorizing ||
    arePreferencesInitializing ||
    isLocalizationInitializing
  ) {
    return (
      <InitialLoader />
    )
  }

  return children as ReactElement
}
