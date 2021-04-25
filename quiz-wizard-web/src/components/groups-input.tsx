import {MouseEvent, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {
  fetchGroups,
  selectGroupNameGetter,
  selectIsGroupsFetching,
  selectGroupIds,
  useDispatch
} from 'quiz-wizard-redux'
import {GroupId} from 'quiz-wizard-schema'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {makeStyles} from '@material-ui/core/styles'

import {GroupChip} from './group-chip'

export interface GroupsInputProps {
  groups?: string[]
  onChange?: (groups: string[]) => void
}

export function GroupsInput({
  groups = [],
  onChange
}: GroupsInputProps) {
  const classes = useStyles()

  const dispatch = useDispatch()

  const isGroupsFetching = useSelector(selectIsGroupsFetching)
  const groupIds = useSelector(selectGroupIds)?.filter((id) => !groups.includes(id))
  const getGroupName = useSelector(selectGroupNameGetter)

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      dispatch(fetchGroups())
      isMountedRef.current = true
    },
    [dispatch]
  )

  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const onOpen = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)
  const onClose = () => setAnchor(null)

  if (isGroupsFetching || !isMountedRef.current) {
    return (
      <Paper
        component="ul"
        className={classes.paper}
      >
        <CircularProgress
          className={classes.chip}
          size="32px"
        />
      </Paper>
    )
  }

  const onAddGroup = (groupId: GroupId) => {
    onClose()
    onChange?.([...groups, groupId])
  }

  const onRemoveGroup = (groupId: GroupId) => {
    onChange?.(groups.filter((id) => id !== groupId))
  }

  return (
    <Paper
      component="ul"
      className={classes.paper}
    >
      {groups.map(getGroupName).map((groupName, index) => (
        <li key={groups[index] ?? `unknown-${index}`}>
          <GroupChip
            groupName={groupName}
            className={classes.chip}
            onDelete={() => onRemoveGroup(groups[index])}
          />
        </li>
      ))}
      {Boolean(groupIds?.length) && (
        <>
          <Chip
            label="Add group"
            icon={<AddCircleIcon />}
            className={classes.chip}
            color="secondary"
            onClick={onOpen}
          />
          <Menu
            keepMounted
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={onClose}
          >
            {groupIds?.map((id) => (
              <MenuItem
                key={id}
                onClick={() => onAddGroup(id)}
                children={getGroupName(id) ?? 'Unknown group'}
              />
            ))}
          </Menu>
        </>
      )}
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1)
  }
}))
