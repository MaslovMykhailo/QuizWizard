import {BrowserRouter, Switch} from 'react-router-dom'

import {HomePage, SignInPage} from '../pages'

import {Path} from './path'
import {PublicRoute} from './public-route'
import {PrivateRoute} from './private-route'

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={Path.signIn()}>
          <SignInPage />
        </PublicRoute>
        <PrivateRoute path={Path.home()}>
          <HomePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
