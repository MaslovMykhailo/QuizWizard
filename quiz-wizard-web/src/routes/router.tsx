import {BrowserRouter, Switch} from 'react-router-dom'

import {HomePage, SignInPage, SignUpPage} from '../pages'

import {Path} from './path'
import {PublicRoute} from './public-route'
import {PrivateRoute} from './private-route'

export function Router() {
  return (
    <BrowserRouter>
      <Switch>

        <PublicRoute
          exact
          path={Path.signIn()}
        >
          <SignInPage />
        </PublicRoute>

        <PublicRoute
          exact
          path={Path.signUp()}
        >
          <SignUpPage />
        </PublicRoute>

        <PrivateRoute
          path={Path.home()}
        >
          <HomePage />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}
