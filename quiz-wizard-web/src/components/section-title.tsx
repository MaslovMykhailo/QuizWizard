
import {Route, Switch} from 'react-router'
import Typography, {TypographyProps} from '@material-ui/core/Typography'

import {Path} from '../routes'

export function SectionTitle(
  props: TypographyProps<'h4'>
) {
  const titles = [
    {
      path: Path.dashboard(),
      title: 'Dashboard'
    },
    {
      path: Path.account(),
      title: 'Manage account'
    },
    {
      path: Path.students(),
      title: 'Manage students'
    },
    {
      path: Path.groups(),
      title: 'Manage groups'
    },
    {
      path: Path.quizzes(),
      title: 'Manage quizzes'
    },
    {
      path: Path.answers(),
      title: 'Manage answers'
    },
    {
      path: Path.analytics(),
      title: 'Analytics'
    }
  ]

  return (
    <Switch>
      {titles.map(({path, title}) => (
        <Route
          key={path}
          path={path}
          render={() => (
            <Typography
              {...props}
              variant="h4"
              children={title}
            />
          )}
        />
      ))}
    </Switch>
  )
}
