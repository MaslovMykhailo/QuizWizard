import {GroupId} from 'quiz-wizard-schema'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {useTranslation} from 'react-i18next'
import {ChangeEvent} from 'react'
import {makeStyles} from '@material-ui/core'

export interface GroupSelectProps {
  selectedGroup?: string
  groups?: GroupId[]
  getGroupName: (groupId: GroupId) => string | undefined
  onSelectGroup?: (groupId: GroupId) => void
}

export function GroupSelect({
  selectedGroup,
  groups = [],
  getGroupName,
  onSelectGroup
}: GroupSelectProps) {
  const [t] = useTranslation()
  const classes = useStyles()

  const onGroupChange = (event: ChangeEvent<{value: unknown}>) => {
    onSelectGroup?.(event.target.value as GroupId)
  }

  return (
    <FormControl className={classes.select}>
      <InputLabel id="group-select-label">
        {t('GROUP')}
      </InputLabel>
      <Select
        id="group-select"
        labelId="group-select-label"
        value={selectedGroup}
        onChange={onGroupChange}
      >
        <MenuItem value="">
          <em>{t('NONE')}</em>
        </MenuItem>
        {groups.map((id) => (
          <MenuItem
            key={id}
            value={id}
          >
            {getGroupName(id) ?? t('UNKNOWN_GROUP')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: theme.spacing(12)
  }
}))
