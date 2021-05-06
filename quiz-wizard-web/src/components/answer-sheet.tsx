import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

export interface AnswerSheetProps {
  sheet: string | Blob
}

export function AnswerSheet({
  sheet
}: AnswerSheetProps) {
  const classes = useStyles()
  return (
    <Paper
      variant="outlined"
      className={classes.paper}
    >
      <img
        src={sheet instanceof Blob ? URL.createObjectURL(sheet) : sheet}
        alt="answer-sheet"
        className={classes.image}
      />
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(55)
  },
  image: {
    width: '100%',
    objectFit: 'cover'
  }
}))
