import {useRef} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {NewGroupSchema} from 'quiz-wizard-schema'
import {createGroup, selectIsNewGroupCreating, useDispatch} from 'quiz-wizard-redux'

import {GroupForm, PageLoader} from '../components'

export function NewGroupPage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const isCreating = useSelector(selectIsNewGroupCreating)
  const waitForUpdateRef = useRef(false)

  if (isCreating || waitForUpdateRef.current) {
    return (
      <PageLoader />
    )
  }

  const onCreate = (group: NewGroupSchema) => {
    waitForUpdateRef.current = true
    dispatch(createGroup(group))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onCancel = () => history.goBack()

  return (
    <GroupForm
      onCreate={onCreate}
      onCancel={onCancel}
    />
  )
}
