import {AnswerOption, QuestionAnswer} from 'quiz-wizard-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import {makeStyles} from '@material-ui/core/styles'

import {answerOptions} from '../helpers'

export type Answers = Partial<Record<AnswerOption, QuestionAnswer>>

export interface AnswerOptionsFormProps {
  readOnly?: boolean
  answers: Partial<Record<AnswerOption, QuestionAnswer>>
  onChange?: (answers: Answers) => void
}

export function AnswerOptionsForm({
  readOnly,
  answers,
  onChange
}: AnswerOptionsFormProps) {
  const classes = useStyles()

  const options = Object.keys(answers).filter((option) => answers[option as AnswerOption])
  const onAddAnswer = () => onChange?.({
    ...answers,
    [answerOptions[options.length]]: {
      text: ''
    }
  })

  return (
    <List>
      {answerOptions.filter((option) => answers[option]).map((option) => (
        <ListItem key={option}>
          <ListItemAvatar>
            <Avatar
              className={classes[answers[option]?.correct ? 'correctOption' : 'incorrectOption']}
              children={option}
            />
          </ListItemAvatar>
          <TextField
            className={classes.answerInput}
            value={answers[option]?.text}
            onChange={(event) => onChange?.({
              ...answers,
              [option]: {
                ...answers[option],
                text: event.target.value
              }
            })}
          />
          <ListItemSecondaryAction>
            {answers[option]?.correct ? (
              <IconButton
                className={classes.correctButton}
                onClick={!readOnly ? () => onChange?.({
                  ...answers,
                  [option]: {
                    ...answers[option],
                    correct: false
                  }
                }) : undefined}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.incorrectButton}
                onClick={!readOnly ? () => onChange?.({
                  ...answers,
                  [option]: {
                    ...answers[option],
                    correct: true
                  }
                }) : undefined}
              >
                <HighlightOffIcon />
              </IconButton>
            )}
            {!readOnly && (
              <IconButton
                onClick={() => onChange?.({
                  ...answers,
                  [option]: undefined
                })}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      {(!readOnly && options.length < answerOptions.length) && (
        <ListItem
          button
          onClick={onAddAnswer}
          className={classes.addItem}
        >
          <AddIcon className={classes.addItemIcon} />
          <Typography children="Add answer" />
        </ListItem>
      )}
    </List>
  )
}

const useStyles = makeStyles((theme) => ({
  addItem: {
    marginTop: theme.spacing(2)
  },
  addItemIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3)
  },
  answerInput: {
    width: `calc(100% - ${theme.spacing(16)}px)`
  },
  correctOption: {
    background: theme.palette.success.main
  },
  incorrectOption: {
    background: theme.palette.error.main
  },
  correctButton: {
    color: theme.palette.success.main
  },
  incorrectButton: {
    color: theme.palette.error.main
  }
}))
