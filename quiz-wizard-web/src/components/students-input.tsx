import sortBy from 'lodash/sortBy'
import difference from 'lodash/difference'
import {ReactNode, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {StudentId, StudentSchema} from 'quiz-wizard-schema'
import {
  fetchStudents,
  selectStudentGetter,
  selectStudentIds,
  selectAreStudentsFetching,
  useDispatch
} from 'quiz-wizard-redux'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

import {StudentAvatar} from './student-avatar'

export interface StudentsInputProps {
  students?: StudentId[]
  onChange?: (students: StudentId[]) => void
}

export function StudentsInput({
  students = [],
  onChange
}: StudentsInputProps) {
  const [t] = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()

  const isMountedRef = useRef(false)
  const areStudentsFetching = useSelector(selectAreStudentsFetching)

  useEffect(
    () => {
      isMountedRef.current = true
      dispatch(fetchStudents())
    },
    [dispatch]
  )

  const studentIds = useSelector(selectStudentIds)
  const getStudent = useSelector(selectStudentGetter)

  if (!isMountedRef.current || areStudentsFetching) {
    return (
      <CircularProgress />
    )
  }

  const selectedStudents = sortStudents(students.map(getStudent))
  const nonSelectedStudents = sortStudents(difference(studentIds, students).map(getStudent))

  const onAdd = (studentId: StudentId) => onChange?.(
    prepareIds([...selectedStudents, getStudent(studentId)])
  )
  const onRemove = (studentId: StudentId) => onChange?.(
    prepareIds(selectedStudents.filter((student) => student?.id !== studentId))
  )

  return (
    <Grid
      container
      spacing={4}
    >
      <Grid item>
        <Paper>
          <Box className={classes.box}>
            <Typography
              variant="h5"
              color="secondary"
              children={t('STUDENTS_IN_GROUP')}
            />
          </Box>
          <StudentList
            students={selectedStudents}
            onAction={onRemove}
            actionIcon={<RemoveCircleIcon color="secondary" />}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Box className={classes.box}>
            <Typography
              variant="h5"
              color="primary"
              children={t('NOT_ADDED_STUDENTS')}
            />
          </Box>
          <StudentList
            students={nonSelectedStudents}
            onAction={onAdd}
            actionIcon={<AddCircleIcon color="primary" />}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

interface StudentListProps {
  students: Array<StudentSchema | undefined>
  onAction: (studentId: StudentId) => void
  actionIcon: ReactNode
}

function StudentList({
  students,
  onAction,
  actionIcon
}: StudentListProps) {
  const [t] = useTranslation()
  const classes = useStyles()
  return students.length ? (
    <List>
      {students.map((student) => (
        <StudentListItem
          key={student?.id}
          student={student}
          onAction={() => onAction(student!.id)}
          actionIcon={actionIcon}
        />
      ))}
    </List>
  ) : (
    <Box className={classes.box}>
      <Typography
        variant="body1"
        color="textSecondary"
        children={t('NO_STUDENTS')}
      />
    </Box>
  )
}

interface StudentListItemProps {
  student?: StudentSchema
  onAction: () => void
  actionIcon: ReactNode
}

function StudentListItem({
  student,
  onAction,
  actionIcon
}: StudentListItemProps) {
  const [t] = useTranslation()
  return (
    <ListItem
      button
      onClick={onAction}
    >
      <ListItemAvatar>
        <StudentAvatar {...student} />
      </ListItemAvatar>
      <ListItemText
        primary={ student ? `${student.firstName} ${student.lastName}` : t('UNKNOWN_STUDENT')}
        secondary={`${t('STUDENT_ID')} ${student?.id}`}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={onAction}
          children={actionIcon}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(2)
  }
}))

const sortStudents = (students: (StudentSchema | undefined)[]) =>
  sortBy(students, 'firstName')

const prepareIds = (students: (StudentSchema | undefined)[]) =>
  sortStudents(students).map((student) => student?.id).filter(Boolean) as string[]
