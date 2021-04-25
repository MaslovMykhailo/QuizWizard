import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

export interface FormControlsProps {
  onSave?(): void
  saveDisabled?: boolean
  onCreate?(): void
  createDisabled?: boolean
  onCancel?(): void
  onDelete?(): void
}

export function FormControls({
  onSave,
  saveDisabled,
  onCancel,
  createDisabled,
  onCreate,
  onDelete
}: FormControlsProps) {
  const classes = useStyles()
  return (
    <Grid
      item
      container
      spacing={2}
    >
      {onDelete && (
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            children="Delete"
            onClick={onDelete}
          />
        </Grid>
      )}
      {onCancel && (
        <Grid
          item
          className={classes.cancelItem}
        >
          <Button
            variant="contained"
            children="Cancel"
            onClick={onCancel}
          />
        </Grid>
      )}
      {onCreate && (
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            children="Create"
            disabled={createDisabled}
            onClick={onCreate}
          />
        </Grid>
      )}
      {onSave && (
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            children="Save"
            disabled={saveDisabled}
            onClick={onSave}
          />
        </Grid>
      )}
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  cancelItem: {
    marginLeft: 'auto'
  }
}))
