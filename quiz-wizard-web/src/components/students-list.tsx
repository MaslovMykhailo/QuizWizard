import {useTranslation} from 'react-i18next'
import {GroupId, StudentId, StudentSchema} from 'quiz-wizard-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import {makeStyles} from '@material-ui/core'

import {GroupChip} from './group-chip'
import {StudentAvatar} from './student-avatar'

export interface StudentInfo extends StudentSchema {
  isFetching: boolean
  isDeleting: boolean
}

export interface StudentsListProps {
  students: StudentInfo[]
  onClick: (studentId: StudentId) => void
  onDelete: (studentId: StudentId) => void
  getGroupName: (groupId: GroupId) => string | undefined
}

export function StudentsList({
  students,
  onClick,
  onDelete,
  getGroupName
}: StudentsListProps) {
  return (
    <List>
      {students.map((student) => (
        <StudentsListItem
          key={student.id}
          onClick={() => onClick(student.id)}
          onDelete={() => onDelete(student.id)}
          getGroupName={getGroupName}
          {...student}
        />
      ))}
    </List>
  )
}

export interface StudentsListItemProps extends StudentInfo {
  onClick: () => void
  onDelete: () => void
  getGroupName: (groupId: GroupId) => string | undefined
}

export function StudentsListItem({
  id,
  firstName,
  lastName,
  groups,
  onClick,
  onDelete,
  isDeleting,
  getGroupName
}: StudentsListItemProps) {
  const [t] = useTranslation()
  const classes = useStyles()
  return (
    <ListItem
      button
      onClick={onClick}
    >
      <ListItemAvatar>
        <StudentAvatar
          firstName={firstName}
          lastName={lastName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${lastName} ${firstName}`}
        secondary={`${t('STUDENT_ID')} ${id}`}
      />
      {groups?.map(getGroupName).map((groupName, index) => (
        <GroupChip
          key={groups ? groups[index] : `unknown-${index}` }
          groupName={groupName}
          className={classes.groupChip}
        />
      ))}
      <ListItemSecondaryAction>
        {isDeleting ? (
          <CircularProgress
            size="36px"
            className={classes.deleteProgress}
          />
        ) : (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  deleteProgress: {
    marginRight: theme.spacing(-1)
  },
  groupChip: {
    marginRight: theme.spacing(1)
  }
}))
