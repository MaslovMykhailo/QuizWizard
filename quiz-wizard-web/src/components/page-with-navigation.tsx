import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'

import {NavigationDrawer, NavigationDrawerProps} from './navigation-drawer'

export function PageWithNavigation(
  props: NavigationDrawerProps
) {
  const classes = useStyles()

  return (
    <Container
      component="div"
      className={classes.container}
    >
      <NavigationDrawer {...props} />
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    height: '100%'
  }
}))
