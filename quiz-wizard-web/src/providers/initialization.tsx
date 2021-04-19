import {FC, ReactElement, useEffect, useState} from 'react'
import {
  authorizeUser,
  selectIsUserAuthorizing,
  useDispatch,
  useSelector
} from 'quiz-wizard-redux'
import {initLocalization} from 'quiz-wizard-localization'
import CircularProgress from '@material-ui/core/CircularProgress'

import {Page} from '../components'

export const InitializationProvider: FC = ({children}) => {
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

  const [isLocalizationInit, setIsLocalizationInit] = useState(false)

  useEffect(
    () => {
      initLocalization('en')
        .finally(() => setIsLocalizationInit(true))
    },
    []
  )

  const isInitializing =
    (isAuthorizing && !isAuthorizedOnce) ||
    !isLocalizationInit

  if (isInitializing) {
    return (
      <Page>
        <CircularProgress />
      </Page>
    )
  }

  return children as ReactElement
}
