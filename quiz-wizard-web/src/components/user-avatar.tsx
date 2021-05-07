import clsx from 'clsx'
import {UserSchema} from 'quiz-wizard-schema'
import Avatar from '@material-ui/core/Avatar'
import {makeStyles} from '@material-ui/core/styles'

export interface UserAvatarProps extends UserSchema {
  className?: string
}

export function UserAvatar({
  avatar,
  firstName,
  lastName,
  className
}: UserAvatarProps) {
  const classes = useStyles()

  if (avatar) {
    return (
      <Avatar
        className={clsx(classes.avatar, className)}
        src={avatar}
      />
    )
  }

  const letters = [lastName, firstName].
    map((word) => word[0])
    .join('')

  return (
    <Avatar
      className={clsx(classes.avatar, className)}
      children={letters}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(29),
    height: theme.spacing(29),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
}))
