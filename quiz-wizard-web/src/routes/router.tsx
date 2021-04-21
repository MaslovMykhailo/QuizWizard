import {useCallback, useMemo} from 'react'
import {BrowserRouter, Switch, Route, useLocation, useHistory, Redirect} from 'react-router-dom'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import HomeIcon from '@material-ui/icons/Home'

import {
  AccountPage,
  AnalyticsPage,
  AnswersPage,
  GroupsPage,
  HomePage,
  QuizzesPage,
  SignInPage,
  SignUpPage,
  StudentsPage
} from '../pages'
import {NavigationTarget, PageWithNavigation} from '../components'

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

        <AppRoute />

      </Switch>
    </BrowserRouter>
  )
}

function AppRoute() {

  const history = useHistory()
  const location = useLocation()

  const onNavigate = useCallback(
    (path: string) => {
      if (location.pathname.match(path)) {
        return
      }

      history.push(path)
    },
    [history, location]
  )

  const navigationTargets = useNavigationTargets()

  return (
    <Route>
      <PageWithNavigation
        {...navigationTargets}
        onNavigate={onNavigate}
        toolbar={null}
      >
        <Switch>

          <PrivateRoute
            exact
            path={Path.students()}
          >
            <StudentsPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.groups()}
          >
            <GroupsPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.quizzes()}
          >
            <QuizzesPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.quizzes()}
          >
            <QuizzesPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.answers()}
          >
            <AnswersPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.analytics()}
          >
            <AnalyticsPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.account()}
          >
            <AccountPage />
          </PrivateRoute>

          <PrivateRoute
            exact
            path={Path.home()}
          >
            <HomePage />
          </PrivateRoute>

          <Redirect
            to={Path.home()}
          />

        </Switch>
      </PageWithNavigation>
    </Route>
  )
}

const useNavigationTargets = () => {
  const topNavigationTargets = useMemo<NavigationTarget[]>(
    () => [
      {
        path: Path.students(),
        caption: 'Students',
        Icon: LocalLibraryIcon
      },
      {
        path: Path.groups(),
        caption: 'Groups',
        Icon: GroupIcon
      },
      {
        path: Path.quizzes(),
        caption: 'Quizzes',
        Icon: AssignmentIcon
      },
      {
        path: Path.answers(),
        caption: 'Answers',
        Icon: AssignmentTurnedInIcon
      },
      {
        path: Path.analytics(),
        caption: 'Analytics',
        Icon: EqualizerIcon
      }
    ],
    []
  )

  const bottomNavigationTargets = useMemo<NavigationTarget[]>(
    () => [
      {
        path: Path.home(),
        caption: 'Home',
        Icon: HomeIcon
      }
    ],
    []
  )

  return {topNavigationTargets, bottomNavigationTargets}
}
