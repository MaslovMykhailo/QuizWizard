import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {makeStyles} from '@material-ui/core/styles'

import {Path} from '../routes'

export function AddStudentButton() {
  const classes = useStyles()
  return (
    <Link
      to={Path.newStudent()}
      className={classes.link}
    >
      <ListItem
        button
        className={classes.item}
      >
        <PersonAddIcon
          fontSize="large"
        />
      </ListItem>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  link: {
    color: 'unset'
  },
  item: {
    display: 'flex',
    justifyContent: 'center'
  }
}))
