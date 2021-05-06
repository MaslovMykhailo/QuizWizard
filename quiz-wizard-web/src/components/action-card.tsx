import {ReactNode} from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import {makeStyles} from '@material-ui/core/styles'

export interface ActionCardProps {
  text: string
  onClick?: () => void
  icon: ReactNode
}

export function ActionCard({
  icon,
  text,
  onClick
}: ActionCardProps) {
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea
        onClick={onClick}
        className={classes.action}
      >
        <Avatar className={classes.avatar}>
          {icon}
        </Avatar>
        <Divider className={classes.divider} />
        <Typography
          className={classes.text}
          variant="h5"
          children={text}
        />
      </CardActionArea>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  action: {
    padding: theme.spacing(2),
    width: theme.spacing(24),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  divider: {
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    background: theme.palette.grey[200],
    margin: theme.spacing(1, 0)
  },
  text: {
    margin: theme.spacing(1, 0),
    textAlign: 'center'
  }
}))
