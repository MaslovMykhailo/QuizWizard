import {AnswerSchema, QuizSchema, StudentSchema} from 'quiz-wizard-schema'
import {calcTotalQuestionsCost} from 'quiz-wizard-client'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/core/styles'

import {Path} from '../routes'

import {BackButton} from './back-button'
import {AnswerResult} from './answer-result'
import {AnswerSheet} from './answer-sheet'
import {Link} from './link'
import {AnswerChecksView} from './answer-checks'

export interface AnswerViewProps {
  answer: AnswerSchema
  quiz: QuizSchema
  student?: StudentSchema,
  onDelete: () => void
}

export function AnswerView({
  answer,
  quiz,
  student,
  onDelete
}: AnswerViewProps) {
  const classes = useStyles()
  const totalPoints = calcTotalQuestionsCost(quiz)

  return (
    <Grid
      container
      direction="column"
      component="form"
      spacing={4}
    >
      <Grid
        item
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            children="Answer info"
          />
        </Grid>
        <Grid
          item
          container
          className={classes.result}
        >
          <AnswerResult result={answer.result} />
        </Grid>
      </Grid>
      <Grid
        item
        container
        wrap="nowrap"
        spacing={9}
      >
        <Grid
          item
          container
          spacing={2}
          direction="column"
        >
          <Grid
            item
            container
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Quiz:</Typography>
            </Grid>
            <Grid item>
              <Link
                to={Path.quiz(quiz.id)}
                variant="h5"
              >
                {quiz.name}
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
          >
            {answer.student ? (
              <>
                <Grid item>
                  <Typography variant="h5">Student:</Typography>
                </Grid>
                <Grid item>
                  {student ? (
                    <Link
                      to={Path.student(student.id)}
                      variant="h5"
                    >
                      {`${student.firstName} ${student.lastName}`}
                    </Link>
                  ) : (
                    <Typography variant="h5">Unknown</Typography>
                  )}
                </Grid>
              </>
            ) : (
              <Grid item>
                <Typography variant="h5">Anonym student</Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Check date:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{new Date(answer.creationDate).toLocaleString()}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid
            item
            container
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Result points:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{Math.round(totalPoints * answer.result * 100) / 100}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Total points:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{totalPoints}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              children="Delete"
              onClick={onDelete}
            />
          </Grid>
          <Grid
            item
            className={classes.details}
          >
            <Typography variant="h4">Details:</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          className={classes.sheet}
        >
          <AnswerSheet sheet={answer.sheet} />
        </Grid>
      </Grid>
      <Grid
        item
        container
      >
        <AnswerChecksView
          checks={answer.checks}
          quiz={quiz}
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  result: {
    width: 'auto',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  sheet: {
    marginLeft: 'auto'
  },
  divider: {
    margin: theme.spacing(4, 0)
  },
  details: {
    marginTop: 'auto'
  }
}))
