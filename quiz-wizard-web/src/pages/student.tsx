import {useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router'
import {useSelector} from 'react-redux'
import {StudentId, StudentSchema} from 'quiz-wizard-schema'
import {
  deleteStudent,
  fetchStudent,
  selectIsStudentDeletingGetter,
  selectIsStudentFetchingGetter,
  selectStudentGetter,
  updateStudent,
  useDispatch
} from 'quiz-wizard-redux'
import Typography from '@material-ui/core/Typography'

import {PageLoader, StudentForm} from '../components'

export function StudentPage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const {studentId} = useParams<{studentId: StudentId}>()

  const student = useSelector(selectStudentGetter)(studentId)
  const isFetching = useSelector(selectIsStudentFetchingGetter)(studentId)
  const isDeleting = useSelector(selectIsStudentDeletingGetter)(studentId)

  const waitForUpdateRef = useRef(true)

  useEffect(
    () => {
      dispatch(fetchStudent(studentId))
      waitForUpdateRef.current = false
    },
    [dispatch, studentId]
  )

  if (
    isFetching ||
    isDeleting ||
    waitForUpdateRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  if (!studentId || !student) {
    return (
      <Typography
        variant="h3"
        color="secondary"
        children="The student is not found"
      />
    )
  }

  const onSave = (student: StudentSchema) => {
    waitForUpdateRef.current = true
    dispatch(updateStudent(student))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onDelete = () => {
    waitForUpdateRef.current = true
    dispatch(deleteStudent(studentId))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onCancel = () => history.goBack()

  return (
    <StudentForm
      student={student}
      onSave={onSave}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  )
}
