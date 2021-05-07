import {ChangeEvent, useEffect, useRef} from 'react'
import {useHistory} from 'react-router'
import {useTranslation} from 'react-i18next'
import {GroupId} from 'quiz-wizard-schema'
import {
  useDispatch,
  fetchAllResources,
  useSelector,
  selectIsAnyResourceFetching,
  selectGroupIds,
  selectGroupNameGetter
} from 'quiz-wizard-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {Path} from '../routes'
import {
  GroupAnalytic,
  GroupsAnalytic,
  GroupSelect,
  PageLoader
} from '../components'
import {useQuery} from '../hooks'

export function AnalyticsPage() {
  const [t] = useTranslation()

  const dispatch = useDispatch()
  const isMountedRef = useRef(false)

  useEffect(
    () => {
      isMountedRef.current = true
      dispatch(fetchAllResources())
    },
    [dispatch]
  )

  const isAnyResourceFetching = useSelector(selectIsAnyResourceFetching)
  if (!isMountedRef.current || isAnyResourceFetching) {
    return (
      <PageLoader />
    )
  }

  return (
    <Grid
      item
      container
      spacing={4}
      direction="column"
    >
      <Grid
        item
        container
        spacing={2}
        wrap="nowrap"
      >
        <Grid
          item
          container
          spacing={2}
          xs={6}
          alignItems="flex-end"
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h5">
              {t('EXPLORE_ANALYTIC_BY')}
            </Typography>
          </Grid>
          <Grid item>
            <AnalyticTypeSelect />
          </Grid>
        </Grid>
        <AnalyticTargetIdSelect />
      </Grid>
      <Grid item>
        <Analytic />
      </Grid>
    </Grid>
  )
}

function AnalyticTypeSelect() {
  const [t] = useTranslation()
  const history = useHistory()

  const type = useAnalyticType()
  const handleTypeChange = (
    event: ChangeEvent<{value: unknown}>
  ) => {
    const selectedType = event.target.value as string
    if (selectedType === type) {
      return
    }
    history.push(Path.analytics(selectedType))
  }

  return (
    <FormControl>
      <InputLabel id="analytic-type-label">{t('TYPE')}</InputLabel>
      <Select
        id="analytic-type"
        labelId="analytic-type-label"
        value={type}
        onChange={handleTypeChange}
      >
        <MenuItem value="group">
          {t('GROUP')}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function AnalyticTargetIdSelect() {
  const analyticType = useAnalyticType()
  switch (analyticType) {
    case 'group':
    default:
      return <GroupAnalyticTargetSelect />
  }
}

function GroupAnalyticTargetSelect() {
  const [t] = useTranslation()
  const history = useHistory()

  const groups = useSelector(selectGroupIds)
  const getGroupName = useSelector(selectGroupNameGetter)

  const selectedGroup = useAnalyticTargetId() ?? ''
  const onSelectGroup = (groupId: GroupId) => {
    history.push(Path.analytics('group', groupId))
  }

  return (
    <Grid
      item
      container
      spacing={2}
      xs={6}
      alignItems="flex-end"
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h5">
          {t('SELECT_GROUP')}
        </Typography>
      </Grid>
      <Grid item>
        <GroupSelect
          groups={groups}
          selectedGroup={selectedGroup}
          getGroupName={getGroupName}
          onSelectGroup={onSelectGroup}
        />
      </Grid>
    </Grid>
  )
}

function Analytic() {
  const analyticType = useAnalyticType()
  switch (analyticType) {
    case 'group':
    default:
      return <AnalyticForGroup />
  }
}

function AnalyticForGroup() {
  const groupId = useAnalyticTargetId()

  if (groupId) {
    return <GroupAnalytic />
  }

  return <GroupsAnalytic />
}

const useAnalyticType = () => {
  const query = useQuery()
  switch (query.get('type')) {
    case 'group':
    default:
      return 'group'
  }
}

const useAnalyticTargetId = () => {
  const query = useQuery()
  return query.get('id')
}
