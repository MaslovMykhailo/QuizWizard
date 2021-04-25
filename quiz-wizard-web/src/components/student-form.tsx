import isEqual from 'lodash/isEqual'
import {useState} from 'react'
import {NewStudentSchema, StudentSchema} from 'quiz-wizard-schema'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import InfoIcon from '@material-ui/icons/Info'
import {makeStyles} from '@material-ui/core/styles'

import {useInputState} from '../hooks'

import {BackButton} from './back-button'
import {FormControls} from './form-controls'
import {GroupsInput} from './groups-input'

export interface StudentFormProps {
  student?: StudentSchema
  onSave?: (student: StudentSchema) => void
  onCreate?: (student: NewStudentSchema) => void
  onCancel?: () => void
  onDelete?: () => void
}

export function StudentForm({
  student,
  onSave,
  onCreate,
  onCancel,
  onDelete
}: StudentFormProps) {
  const classes = useStyles()

  const [firstName, onChangeFirstName] = useInputState(student?.firstName)
  const [lastName, onChangeLastName] = useInputState(student?.lastName)
  const [groups, onChangeGroups] = useState(student?.groups)

  const hasChanges =
    student?.firstName !== firstName ||
    student?.lastName !== lastName ||
    !isEqual(student?.groups, groups)

  const isValid = firstName && lastName

  const handleOnSave = () => {
    if (student && firstName && lastName) {
      onSave?.({
        id: student.id,
        firstName,
        lastName,
        groups
      })
    }
  }

  const handleOnCreate = () => {
    if (firstName && lastName) {
      onCreate?.({
        firstName,
        lastName,
        groups
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
            children={student ? 'Student info' : 'New student'}
          />
        </Grid>
        {student && (
          <Grid
            item
            className={classes.chipId}
          >
            <Chip
              color="secondary"
              icon={<InfoIcon />}
              label={`Student ID: ${student.id}`}
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
            label="First name"
            autoComplete="fname"
            fullWidth
            value={firstName}
            error={!firstName}
            onChange={onChangeFirstName}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Last name"
            autoComplete="lname"
            fullWidth
            value={lastName}
            error={!lastName}
            onChange={onChangeLastName}
            required
          />
        </Grid>
        <Grid item>
          <GroupsInput
            groups={groups}
            onChange={onChangeGroups}
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
