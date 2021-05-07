import {useEffect, useRef} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {StudentId} from 'quiz-wizard-schema'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {
  fetchGroups,
  fetchStudents,
  useDispatch,
  selectAreGroupsFetching,
  selectAreStudentsFetching,
  selectSortedStudentsInfo,
  deleteStudent,
  selectGroupNameGetter
} from 'quiz-wizard-redux'

import {AddListItemButton, PageLoader, StudentsList} from '../components'
import {Path} from '../routes'

export function StudentsPage() {
  const [t] = useTranslation()

  const history = useHistory()
  const dispatch = useDispatch()

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      dispatch(fetchStudents())
      dispatch(fetchGroups())

      isMountedRef.current = true
    },
    [dispatch]
  )

  const students = useSelector(selectSortedStudentsInfo)
  const getGroupName = useSelector(selectGroupNameGetter)

  const areStudentsFetching = useSelector(selectAreStudentsFetching)
  const areGroupsFetching = useSelector(selectAreGroupsFetching)

  if (
    !isMountedRef.current ||
    areStudentsFetching ||
    areGroupsFetching
  ) {
    return (
      <PageLoader />
    )
  }

  const onStudentClick = (studentId: StudentId) =>
    history.push(Path.student(studentId))

  const onStudentDelete = (studentId: StudentId) =>
    dispatch(deleteStudent(studentId))

  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h3"
          children={t('STUDENTS_LIST')}
        />
      </Grid>
      <Grid item>
        <Paper>
          <StudentsList
            students={students}
            onClick={onStudentClick}
            onDelete={onStudentDelete}
            getGroupName={getGroupName}
          />
        </Paper>
      </Grid>
      <Grid item>
        <AddListItemButton
          addItemPath={Path.newStudent()}
          icon={<PersonAddIcon fontSize="large" />}
        />
      </Grid>
    </Grid>
  )
}
