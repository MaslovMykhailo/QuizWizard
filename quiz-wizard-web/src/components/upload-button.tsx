import {ChangeEvent} from 'react'
import {useTranslation} from 'react-i18next'
import Button from '@material-ui/core/Button'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import {makeStyles} from '@material-ui/core/styles'

export interface UploadButtonProps {
  onChange: (file: File) => void
}

export function UploadButton({
  onChange
}: UploadButtonProps) {
  const [t] = useTranslation()
  const classes = useStyles()

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }

    const file = event.target.files[0]
    onChange(file)
  }

  return (
    <div className={classes.root}>
      <input
        id="button-file"
        type="file"
        accept="image/*"
        className={classes.input}
        onChange={onInputChange}
      />
      <label htmlFor="button-file">
        <Button
          color="primary"
          component="span"
          variant="contained"
          startIcon={<PhotoCamera />}
          children={t('UPLOAD')}
        />
      </label>
    </div>
  )
}

const useStyles = makeStyles((theme) =>({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}))
