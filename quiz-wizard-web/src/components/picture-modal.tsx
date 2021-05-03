import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import {useState} from 'react'

import {useInputState} from '../hooks'

import {FormControls} from './form-controls'
import {UploadButton} from './upload-button'

export interface PictureModalProps {
  open?: boolean
  onReady?: (picture: string | Blob) => void
  onCancel?: () => void
}

export function PictureModal({
  open = false,
  onReady,
  onCancel
}: PictureModalProps) {
  const classes = useStyles()

  const [pictureUrl, onChangePictureUrl] = useInputState('')
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined)

  const hasPicture = pictureUrl || uploadedFile

  return (
    <Modal
      open={open}
      onClose={onCancel}
    >
      <Container
        maxWidth="sm"
        className={classes.root}
      >
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={4}
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h4"
                children="Select picture"
              />
            </Grid>
            <Grid item>
              <Typography
                children="Paste url from the Internet:"
              />
              <TextField
                fullWidth
                value={pictureUrl}
                onChange={onChangePictureUrl}
                placeholder="https://my-picture-url.jpeg"
                className={classes.action}
              />
            </Grid>
            <Grid item>
              <Typography
                children="Upload picture from your computer:"
              />
              <Grid
                container
                alignItems="center"
                className={classes.action}
              >
                <UploadButton onChange={setUploadedFile} />
                {uploadedFile && (
                  <Typography
                    children={uploadedFile.name}
                  />
                )}
              </Grid>
            </Grid>
            <FormControls
              saveDisabled={!hasPicture}
              onSave={() => onReady?.(uploadedFile ?? pictureUrl!)}
              onCancel={onCancel}
            />
          </Grid>
        </Paper>
      </Container>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
  },
  paper: {
    padding: theme.spacing(4)
  },
  action: {
    marginTop: theme.spacing(2)
  }
}))
