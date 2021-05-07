import isEqual from 'lodash/isEqual'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {GroupSchema, NewGroupSchema} from 'quiz-wizard-schema'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import InfoIcon from '@material-ui/icons/Info'
import {makeStyles} from '@material-ui/core/styles'

import {useInputState} from '../hooks'

import {BackButton} from './back-button'
import {FormControls} from './form-controls'
import {StudentsInput} from './students-input'

export interface GroupFormProps {
  group?: GroupSchema
  onSave?: (student: GroupSchema) => void
  onCreate?: (student: NewGroupSchema) => void
  onCancel?: () => void
  onDelete?: () => void
}

export function GroupForm({
  group,
  onSave,
  onCreate,
  onCancel,
  onDelete
}: GroupFormProps) {
  const [t] = useTranslation()
  const classes = useStyles()

  const [name, onChangeName] = useInputState(group?.name ?? '')
  const [description, onChangeDescription] = useInputState(group?.description ?? '')
  const [students, onChangeStudents] = useState(group?.students)

  const hasChanges =
    group?.name !== name ||
    group?.description !== description ||
    !isEqual(group?.students, students)

  const isValid = Boolean(name)

  const handleOnSave = () => {
    if (group && name) {
      onSave?.({
        id: group.id,
        name,
        description,
        students
      })
    }
  }

  const handleOnCreate = () => {
    if (name) {
      onCreate?.({
        name,
        description,
        students
      })
    }
  }

  return (
    <Grid
      container
      direction="column"
      component="form"
      spacing={4}
    >
      <Grid
        item
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            children={group ? t('GROUP_INFO') : t('NEW_GROUP')}
          />
        </Grid>
        {group && (
          <Grid
            item
            className={classes.chipId}
          >
            <Chip
              color="secondary"
              icon={<InfoIcon />}
              label={`${t('ID')} ${group.id}`}
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        direction="column"
        spacing={4}
      >
        <Grid item>
          <TextField
            variant="outlined"
            label={t('GROUP_NAME')}
            fullWidth
            value={name}
            error={!name}
            onChange={onChangeName}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label={t('DESCRIPTION')}
            fullWidth
            multiline
            value={description}
            onChange={onChangeDescription}
          />
        </Grid>
        <Grid item>
          <StudentsInput
            students={students}
            onChange={onChangeStudents}
          />
        </Grid>
        <FormControls
          onSave={onSave && handleOnSave}
          saveDisabled={!hasChanges || !isValid}
          onCreate={onCreate && handleOnCreate}
          createDisabled={!hasChanges || !isValid}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  chipId: {
    marginLeft: 'auto'
  }
}))
