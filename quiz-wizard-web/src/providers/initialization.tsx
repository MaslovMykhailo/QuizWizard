import {FC, ReactElement, useEffect, useState} from 'react'
import {
  authorizeUser,
  fetchPreferences,
  selectIsPreferencesFulfilled,
  selectIsPreferencesInitializing,
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
  const isInitializing = useSelector(selectIsPreferencesInitializing)

  useEffect(
    () => {
      dispatch(fetchPreferences(true))
    },
    [dispatch]
  )

  return isInitializing
}

const useLocalizationInit = () => {
  const language = useSelector(selectLanguage)

  const [isInitialized, setIsInitialized] = useState(false)
  const isPreferencesFulfilled = useSelector(selectIsPreferencesFulfilled)

  useEffect(
    () => {
      if (!isPreferencesFulfilled || isInitialized) {
        return
      }

      initLocalization(language)
        .finally(() => setIsInitialized(true))
    },
    [isPreferencesFulfilled, isInitialized, language]
  )

  return !isInitialized
}

export const InitializationProvider: FC = ({children}) => {
  const isAuthorizing = useAuthorizationInit()
  const isPreferencesInitializing = usePreferencesInit()
  const isLocalizationInitializing = useLocalizationInit()

  if (
    isAuthorizing ||
    isPreferencesInitializing ||
    isLocalizationInitializing
  ) {
    return (
      <InitialLoader />
    )
  }

  return children as ReactElement
}
