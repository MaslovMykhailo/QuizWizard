import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import {makeStyles} from '@material-ui/core/styles'

export interface PictureControlProps {
  picture?: string | Blob
  onChange?: (picture?: Blob) => void
  onDelete?: () => void
  className?: string
}

export function PictureControl({
  picture,
  onChange,
  onDelete,
  className
}: PictureControlProps) {
  const classes = useStyles()
  return (
    <Paper
      variant="outlined"
      className={clsx(classes.paper, className)}
    >
      {picture ? (
        <img
          src={picture instanceof Blob ? URL.createObjectURL(picture) : picture}
          alt="question-illustration"
          height="100%"
        />
      ) : (
        <Box className={clsx(classes.paper, classes.noPictureBox)}>
          <AddIcon fontSize="large" />
          <Typography children="Add picture" />
        </Box>
      )}
    </Paper>
  )
}

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    height: '100%'
  },
  noPictureBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
