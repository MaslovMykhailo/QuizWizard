import {Route, RouteProps, Redirect, useLocation} from 'react-router-dom'
import {selectIsUserAuthorized, useSelector} from 'quiz-wizard-redux'

import {Path} from './path'

export function PrivateRoute({
  children,
  ...props
}: RouteProps) {
  const {state} = useLocation<{signOutFrom: {pathname: string}}>()
  const isAuthorized = useSelector(selectIsUserAuthorized)
  return (
    <Route
      {...props}
      render={({location}) => isAuthorized ? children : (
        <Redirect
          to={{
            pathname: state && 'signOutFrom' in state ? state.signOutFrom.pathname : Path.signIn(),
            state: {signInFrom: location}
          }}
        />
      )}
    />
  )
}
