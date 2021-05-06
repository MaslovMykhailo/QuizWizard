import clsx from 'clsx'
import {
  AnswerChecks,
  AnswerOption,
  QuestionAnswer,
  QuestionSchema,
  QuizSchema
} from 'quiz-wizard-schema'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {calcQuestionCost} from 'quiz-wizard-client'

import {answerOptions} from '../helpers'

export interface AnswerChecksProps {
  checks: AnswerChecks
  quiz: QuizSchema
}

export function AnswerChecksView({
  checks,
  quiz
}: AnswerChecksProps) {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <List>
        {quiz.questionsOrder.map((questionId, index) => (
          <AnswerCheckView
            key={questionId}
            index={index + 1}
            question={quiz.questions[questionId]}
            check={checks[questionId]}
          />
        ))}
      </List>
    </Paper>
  )
}

interface AnswerCheckViewProps {
  index: number,
  question: QuestionSchema,
  check: Partial<Record<AnswerOption, boolean>>
}

function AnswerCheckView({
  index,
  check,
  question
}: AnswerCheckViewProps) {
  const classes = useStyles()
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.index}>
            {index}
          </Avatar>
        </ListItemAvatar>
        <Divider
          flexItem
          orientation="vertical"
        />
        {answerOptions.filter((option) => question.answers[option]).map((option) => (
          <AnswerCircle
            key={option}
            option={option}
            status={getAnswerOptionStatus(
              question.answers[option]!,
              check[option]
            )}
          />
        ))}
        <ListItemSecondaryAction>
          <Typography variant="subtitle2">{`Points: ${calcQuestionCost(question, check)}`}</Typography>
          <Typography variant="body2">{`Max points: ${question.cost}`}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider className={classes.divider} />
    </>
  )
}

interface AnswerCircleProps {
  option: AnswerOption
  status: 'correct' | 'incorrect' | 'missed' | 'none'
}

function AnswerCircle({
  option,
  status
}: AnswerCircleProps) {
  const classes = useStyles()
  const className = useAnswerCircleClassName(status)
  return (
    <Avatar className={clsx(classes.option, className)}>
      {option}
    </Avatar>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%'
  },
  index: {
    backgroundColor: theme.palette.primary.main
  },
  divider: {
    '&:last-child': {
      display: 'none'
    }
  },
  option: {
    margin: theme.spacing(0, 0, 0, 2)
  },
  correctOption: {
    backgroundColor: theme.palette.success.main
  },
  incorrectOption: {
    backgroundColor: theme.palette.error.main
  },
  missedOption: {
    backgroundColor: theme.palette.warning.main
  }
}))

const useAnswerCircleClassName = (
  status: 'correct' | 'incorrect' | 'missed' | 'none'
) => {
  const classes = useStyles()
  switch (status) {
    case 'correct':
      return classes.correctOption
    case 'incorrect':
      return classes.incorrectOption
    case 'missed':
      return classes.missedOption
    default:
      return
  }
}

const getAnswerOptionStatus = (
  question: QuestionAnswer,
  check?: boolean
) => {
  if (check === undefined) {
    return question.correct ? 'missed' as const : 'none' as const
  }

  return check ? 'correct' as const : 'incorrect' as const
}
