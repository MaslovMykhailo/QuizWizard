import Container from '@material-ui/core/Container'

import {NavigationDrawer, NavigationDrawerProps} from './navigation-drawer'

export function PageWithNavigation(
  props: NavigationDrawerProps
) {
  return (
    <Container component="div">
      <NavigationDrawer {...props} />
    </Container>
  )
}
