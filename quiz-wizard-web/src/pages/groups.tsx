import {useEffect, useRef} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import AddIcon from '@material-ui/icons/Add'
import {
  fetchGroups,
  useDispatch,
  selectGroupsInfo,
  selectAreGroupsFetching,
  deleteGroup
} from 'quiz-wizard-redux'
import {makeStyles} from '@material-ui/core'
import {GroupId} from 'quiz-wizard-schema'

import {GroupCard, PageLoader} from '../components'
import {Path} from '../routes'

export function GroupsPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const waitForUpdateRef = useRef(true)

  useEffect(
    () => {
      dispatch(fetchGroups())
      waitForUpdateRef.current = false
    },
    [dispatch]
  )

  const groups = useSelector(selectGroupsInfo)
  const areGroupsFetching = useSelector(selectAreGroupsFetching)

  if (areGroupsFetching || waitForUpdateRef.current) {
    return (
      <PageLoader />
    )
  }

  const onAdd = () =>
    history.push(Path.newGroup())

  const onEdit = (groupId: GroupId) =>
    history.push(Path.group(groupId))

  const onDelete = (groupId: GroupId) =>
    dispatch(deleteGroup(groupId))

  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h3"
          children="Groups list"
        />
      </Grid>
      <Grid
        item
        container
        spacing={4}
      >
        {groups.map((group) => (
          <Grid
            item
            key={group.id}
          >
            <GroupCard
              onClick={() => onEdit(group.id)}
              onEdit={() => onEdit(group.id)}
              onDelete={() => onDelete(group.id)}
              {...group}
            />
          </Grid>
        ))}
        <Grid item>
          <Card>
            <CardActionArea
              className={classes.addCard}
              onClick={onAdd}
            >
              <AddIcon fontSize="large" />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  addCard: {
    padding: theme.spacing(6)
  }
}))
