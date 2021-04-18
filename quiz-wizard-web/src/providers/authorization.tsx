import {FC, ReactElement, useEffect, useRef} from 'react'
import {
  authorizeUser,
  selectIsUserAuthorizing,
  useDispatch,
  useSelector
} from 'quiz-wizard-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import {Page} from '../components'

export const AuthorizationProvider: FC = ({children}) => {
  const dispatch = useDispatch()

  const isMountedRef = useRef(false)
  const isAuthorizing = useSelector(selectIsUserAuthorizing)

  useEffect(
    () => {
      isMountedRef.current = true
      dispatch(authorizeUser())
    },
    [dispatch]
  )

  if (isAuthorizing && !isMountedRef.current) {
    return (
      <Page>
        <CircularProgress />
      </Page>
    )
  }

  return children as ReactElement
}
