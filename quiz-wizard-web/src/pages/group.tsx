import {useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {GroupId, GroupSchema} from 'quiz-wizard-schema'
import {
  fetchGroup,
  selectGroupGetter,
  useDispatch,
  selectIsGroupFetchingGetter,
  selectIsGroupDeletingGetter,
  updateGroup,
  deleteGroup
} from 'quiz-wizard-redux'
import Typography from '@material-ui/core/Typography'

import {GroupForm, PageLoader} from '../components'

export function GroupPage() {
  const [t] = useTranslation()

  const history = useHistory()
  const dispatch = useDispatch()

  const {groupId} = useParams<{groupId: GroupId}>()

  const waitForUpdateRef = useRef(true)

  useEffect(
    () => {
      dispatch(fetchGroup(groupId))
      waitForUpdateRef.current = false
    },
    [dispatch, groupId]
  )

  const group = useSelector(selectGroupGetter)(groupId)
  const isFetching = useSelector(selectIsGroupFetchingGetter)(groupId)
  const isUpdating = useSelector(selectIsGroupDeletingGetter)(groupId)

  if (
    isFetching ||
    isUpdating ||
    waitForUpdateRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  if (!groupId || !group) {
    return (
      <Typography
        variant="h3"
        color="secondary"
        children={t('GROUP_NOT_FOUND')}
      />
    )
  }

  const onSave = (group: GroupSchema) => {
    waitForUpdateRef.current = true
    dispatch(updateGroup(group))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onDelete = () => {
    waitForUpdateRef.current = true
    dispatch(deleteGroup(groupId))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onCancel = () => history.goBack()

  return (
    <GroupForm
      group={group}
      onSave={onSave}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  )
}
