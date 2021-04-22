import {useCallback, useMemo} from 'react'
import {BrowserRouter, Switch, Route, useLocation, useHistory, Redirect} from 'react-router-dom'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import DashboardIcon from '@material-ui/icons/Dashboard'

import {
  AccountPage,
  AnalyticsPage,
  AnswersPage,
  DashboardPage,
  GroupsPage,
  QuizzesPage,
  SignInPage,
  SignUpPage,
  StudentsPage
} from '../pages'
import {NavigationTarget, PageWithNavigation, Toolbar} from '../components'

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
          component={SignInPage}
        />

        <PublicRoute
          exact
          path={Path.signUp()}
          component={SignUpPage}
        />

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
        toolbar={<Toolbar />}
      >
        <Switch>

          <PrivateRoute
            exact
            path={Path.dashboard()}
            component={DashboardPage}
          />

          <PrivateRoute
            exact
            path={Path.account()}
            component={AccountPage}
          />

          <PrivateRoute
            path={Path.students()}
            component={StudentsPage}
          />

          <PrivateRoute
            path={Path.groups()}
            component={GroupsPage}
          />

          <PrivateRoute
            path={Path.quizzes()}
            component={QuizzesPage}
          />

          <PrivateRoute
            path={Path.answers()}
            component={AnswersPage}
          />

          <PrivateRoute
            path={Path.analytics()}
            component={AnalyticsPage}
          />

          <Redirect
            to={Path.dashboard()}
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

  const {pathname} = useLocation()

  const bottomNavigationTargets = useMemo<NavigationTarget[] | undefined>(
    () => !pathname.match(Path.dashboard()) ? [
      {
        path: Path.dashboard(),
        caption: 'Dashboard',
        Icon: DashboardIcon
      }
    ] : undefined,
    [pathname]
  )

  return {topNavigationTargets, bottomNavigationTargets}
}
