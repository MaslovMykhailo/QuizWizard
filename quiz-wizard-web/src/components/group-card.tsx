import {GroupSchema} from 'quiz-wizard-schema'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import GroupIcon from '@material-ui/icons/Group'
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from '@material-ui/core/styles'

export interface GroupCardProps extends GroupSchema {
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  isDeleting?: boolean
}

export function GroupCard({
  name,
  description,
  onClick,
  onEdit,
  onDelete,
  isDeleting
}: GroupCardProps) {
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={(
            <Avatar
              children={
                name.length ?
                  name.split(' ').map((s) => s[0]).join('') :
                  <GroupIcon />
              }
            />
          )}
          title={name}
          titleTypographyProps={{variant: 'h5'}}
        />
        <CardContent>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            children={description}
          />
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <IconButton
          color="secondary"
          onClick={onDelete}
        >
          {isDeleting ? (
            <CircularProgress
              color="secondary"
              size="24px"
            />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
        <IconButton
          color="primary"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
