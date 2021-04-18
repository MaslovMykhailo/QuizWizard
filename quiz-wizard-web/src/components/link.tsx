import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom'
import MaterialUILink, {LinkProps as MaterialUILinkProps} from '@material-ui/core/Link'

export function Link(props: RouterLinkProps & MaterialUILinkProps) {
  return (
    <MaterialUILink
      {...props}
      component={RouterLink}
    />
  )
}
