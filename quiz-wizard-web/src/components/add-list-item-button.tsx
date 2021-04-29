import {ReactNode} from 'react'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'

export interface AddListItemButtonProps {
  addItemPath: string
  icon: ReactNode
}

export function AddListItemButton({
  addItemPath,
  icon
}: AddListItemButtonProps) {
  const classes = useStyles()
  return (
    <Link
      to={addItemPath}
      className={classes.link}
    >
      <Paper>
        <ListItem
          button
          className={classes.item}
          children={icon}
        />
      </Paper>
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
