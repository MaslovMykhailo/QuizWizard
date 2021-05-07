import {useTranslation} from 'react-i18next'
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
  const [t] = useTranslation()
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
            children={t('DELETE')}
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
            children={t('CANCEL')}
            onClick={onCancel}
          />
        </Grid>
      )}
      {onCreate && (
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            children={t('CREATE')}
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
            children={t('SAVE')}
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
