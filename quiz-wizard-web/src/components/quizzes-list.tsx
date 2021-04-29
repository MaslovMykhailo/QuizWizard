import {QuizId, QuizSchema} from 'quiz-wizard-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {makeStyles} from '@material-ui/core/styles'

export interface QuizInfo extends QuizSchema {
  isDeleting?: boolean
}

export interface QuizListProps {
  quizzes: QuizInfo[]
  onClickQuiz?: (quizId: QuizId) => void
  onDeleteQuiz?: (quizId: QuizId) => void
  onCheckQuiz?: (quizId: QuizId) => void
  onCreateFromQuiz?: (quizId: QuizId) => void
}

export function QuizList({
  quizzes,
  onClickQuiz,
  onDeleteQuiz,
  onCheckQuiz,
  onCreateFromQuiz
}: QuizListProps) {
  return (
    <List>
      {quizzes.map((quiz) => (
        <QuizListItem
          key={quiz.id}
          quiz={quiz}
          onClick={onClickQuiz && (() => onClickQuiz(quiz.id))}
          onDelete={onDeleteQuiz && (() => onDeleteQuiz(quiz.id))}
          onCheck={onCheckQuiz && (() => onCheckQuiz(quiz.id))}
          onCreateFrom={onCreateFromQuiz && (() => onCreateFromQuiz(quiz.id))}
        />
      ))}
    </List>
  )
}

export interface QuizListItemProps {
  quiz: QuizInfo
  onClick?: () => void
  onDelete?: () => void
  onCheck?: () => void
  onCreateFrom?: () => void
}

export function QuizListItem({
  quiz,
  onClick,
  onCreateFrom,
  onCheck,
  onDelete
}: QuizListItemProps) {
  const classes = useStyles()
  return (
    <ListItem
      button={Boolean(onClick) as true}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar>
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={quiz.name}
        secondary={new Date(quiz.creationDate).toLocaleDateString()}
      />
      <ListItemSecondaryAction>
        {onCreateFrom && (
          <IconButton
            color="primary"
            onClick={onCreateFrom}
          >
            <NoteAddIcon />
          </IconButton>
        )}
        {onCheck && (
          <IconButton
            className={classes.checkAction}
            onClick={onCheck}
          >
            <CheckCircleIcon />
          </IconButton>
        )}
        {(!quiz.isDeleting && onDelete) && (
          <IconButton
            color="secondary"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {quiz.isDeleting && (
          <IconButton color="secondary">
            <CircularProgress
              color="secondary"
              size="24px"
            />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  checkAction: {
    color: theme.palette.success.main
  }
}))
