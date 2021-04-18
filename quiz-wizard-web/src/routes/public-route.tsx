import {Route, RouteProps, Redirect, useLocation} from 'react-router-dom'
import {selectIsUserAuthorized, useSelector} from 'quiz-wizard-redux'

import {Path} from './path'

export function PublicRoute({
  children,
  ...props
}: RouteProps) {
  const {state} = useLocation<{signInFrom: {pathname: string}}>()
  const isAuthorized = useSelector(selectIsUserAuthorized)
  return (
    <Route
      {...props}
      render={({location}) => !isAuthorized ? children : (
        <Redirect
          to={{
            pathname: state && 'signInFrom' in state ? state.signInFrom.pathname : Path.home(),
            state: {signOutFrom: location}
          }}
        />
      )}
    />
  )
}
