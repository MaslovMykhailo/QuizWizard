import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {makeStyles} from '@material-ui/core/styles'

import {useOpenState} from '../hooks'

import {PictureModal} from './picture-modal'

export interface PictureControlProps {
  readOnly?: boolean
  picture?: string | Blob
  onChange?: (picture: string | Blob) => void
  onDelete?: () => void
  className?: string
}

export function PictureControl({
  readOnly,
  picture,
  onChange,
  onDelete,
  className
}: PictureControlProps) {
  const classes = useStyles()

  const {isOpen, open, close} = useOpenState()
  const onReady = (picture: string | Blob) => {
    onChange?.(picture)
    close()
  }

  return (
    <Paper
      variant="outlined"
      className={clsx(classes.root, className)}
    >
      {picture ? (
        <>
          <img
            src={picture instanceof Blob ? URL.createObjectURL(picture) : picture}
            alt="question-illustration"
            className={classes.picture}
          />
          {!readOnly && (
            <>
              <IconButton
                color="primary"
                className={clsx(classes.pictureAction, classes.replaceAction)}
                onClick={open}
              >
                <AutorenewIcon />
              </IconButton>
              <IconButton
                color="secondary"
                className={clsx(classes.pictureAction, classes.deleteAction)}
                onClick={onDelete}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </>
          )}
        </>
      ) : (
        <CardActionArea
          onClick={open}
          className={clsx(classes.noPictureBox)}
        >
          <AddIcon fontSize="large" />
          <Typography children="Add picture" />
        </CardActionArea>
      )}
      <PictureModal
        open={isOpen}
        onCancel={close}
        onReady={onReady}
      />
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    position: 'relative',
    '&:hover > img': {
      opacity: 0.2
    },
    '&:hover > button': {
      opacity: 1
    }
  },
  picture: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    transition: theme.transitions.create('opacity')
  },
  noPictureBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureAction: {
    position: 'absolute',
    top: `calc(50% - ${theme.spacing(3)}px)`,
    transition: theme.transitions.create('opacity'),
    opacity: 0
  },
  replaceAction: {
    left: `calc(50% - ${theme.spacing(6)}px)`
  },
  deleteAction: {
    right: `calc(50% - ${theme.spacing(6)}px)`
  }
}))
