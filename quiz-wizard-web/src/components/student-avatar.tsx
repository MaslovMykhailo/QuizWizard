import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'

export interface StudentAvatarProps {
  firstName?: string
  lastName?: string
}

export function StudentAvatar({
  firstName,
  lastName
}: StudentAvatarProps) {
  return (
    <Avatar>
      {
        firstName && lastName ?
          [lastName, firstName].map((name) => name[0]).join('') :
          (<PersonIcon />)
      }
    </Avatar>
  )
}
