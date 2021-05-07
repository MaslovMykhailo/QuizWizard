
import {Route, Switch} from 'react-router'
import {useTranslation} from 'react-i18next'
import Typography, {TypographyProps} from '@material-ui/core/Typography'

import {Path} from '../routes'

export function SectionTitle(
  props: TypographyProps<'h4'>
) {
  const [t] = useTranslation()
  const titles = [
    {
      path: Path.dashboard(),
      title: t('DASHBOARD')
    },
    {
      path: Path.account(),
      title: t('MANAGE_ACCOUNT')
    },
    {
      path: Path.students(),
      title: t('MANAGE_STUDENTS')
    },
    {
      path: Path.groups(),
      title: t('MANAGE_GROUPS')
    },
    {
      path: Path.quizzes(),
      title: t('MANAGE_QUIZZES')
    },
    {
      path: Path.answers(),
      title: t('MANAGE_ANSWERS')
    },
    {
      path: Path.analytics(),
      title: t('ANALYTICS')
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
