import {useRef} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {NewStudentSchema} from 'quiz-wizard-schema'
import {createStudent,selectIsNewStudentCreating,useDispatch} from 'quiz-wizard-redux'

import {PageLoader, StudentForm} from '../components'

export function NewStudentPage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const isCreating = useSelector(selectIsNewStudentCreating)
  const waitForUpdateRef = useRef(false)

  if (isCreating || waitForUpdateRef.current) {
    return (
      <PageLoader />
    )
  }

  const onCreate = (student: NewStudentSchema) => {
    waitForUpdateRef.current = true
    dispatch(createStudent(student))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onCancel = () => history.goBack()

  return (
    <StudentForm
      onCreate={onCreate}
      onCancel={onCancel}
    />
  )
}
