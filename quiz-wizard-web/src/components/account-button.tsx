import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {makeStyles} from '@material-ui/core'

import {Path} from '../routes'

export function AccountButton() {
  const classes = useStyles()
  return (
    <Link
      to={Path.account()}
      className={classes.link}
    >
      <IconButton color="inherit">
        <AccountCircleIcon />
      </IconButton>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  'link': {
    color: 'inherit'
  }
}))
