import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {
  checkQuiz,
  fetchQuizzes,
  selectAreQuizzesFetching,
  selectIsQuizCheckingGetter,
  selectSortedQuizzesInfo,
  useDispatch
} from 'quiz-wizard-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepButton from '@material-ui/core/StepButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import {AnswerSchema, QuizId} from 'quiz-wizard-schema'

import {Path} from '../routes'
import {useQuery} from '../hooks'
import {BackButton, PageLoader, PictureControl, QuizList} from '../components'

export function NewAnswerPage() {
  const query = useQuery()
  const quizId = query.get('quiz')

  return (
    <>
      <CheckQuizStepper />
      {!quizId ? (
        <SelectQuizToCheckPage />
      ) : (
        <SelectAnswerSheetToCheckPage />
      )}
    </>
  )
}

function CheckQuizStepper() {
  const query = useQuery()
  const history = useHistory()

  const quizId = query.get('quiz')
  const isQuizChecking = useSelector(selectIsQuizCheckingGetter)(quizId ?? '')

  const onSelectQuizStep = () =>
    !isQuizChecking && history.push(Path.newAnswer())

  const classes = useStyles()

  return (
    <Stepper
      nonLinear
      activeStep={quizId ? 1 : 0}
      className={classes.stepper}
    >
      <Step>
        <StepButton
          onClick={onSelectQuizStep}
          completed={Boolean(quizId)}
        >
          Select quiz to check
        </StepButton>
      </Step>
      <Step completed={isQuizChecking}>
        <StepLabel>
          Select answer sheet to check
        </StepLabel>
      </Step>
    </Stepper>
  )
}

function SelectQuizToCheckPage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const areQuizzesFetching = useSelector(selectAreQuizzesFetching)
  const quizzes = useSelector(selectSortedQuizzesInfo)

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      isMountedRef.current = true
      dispatch(fetchQuizzes())
    },
    [dispatch]
  )

  if (
    areQuizzesFetching ||
    !isMountedRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  const onClickQuiz = (quizId: QuizId) =>
    history.push(Path.newAnswer(quizId))

  return (
    <Grid
      container
      spacing={3}
      direction="column"
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
            children="Select quiz to check"
          />
        </Grid>
      </Grid>
      <Grid item>
        <Paper>
          <QuizList
            quizzes={quizzes}
            onClickQuiz={onClickQuiz}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

function SelectAnswerSheetToCheckPage() {
  const classes = useStyles()

  const query = useQuery()
  const history = useHistory()
  const dispatch = useDispatch()

  const [sheet, setChangeSheet] = useState<string | Blob | undefined>(undefined)
  const onDeleteSheet = () => setChangeSheet(undefined)

  const [isQuizChecking, setIsQuizChecking] = useState(false)

  if (isQuizChecking) {
    return (
      <PageLoader />
    )
  }

  const quizId = query.get('quiz')

  const onCheck = () => {
    if (!quizId || !sheet) {
      return
    }

    setIsQuizChecking(true)
    dispatch(checkQuiz({quizId, sheet}))
      .then(({payload}) => history.push(
        Path.answer((payload as AnswerSchema).id))
      )
      .finally(() => setIsQuizChecking(false))
  }
  const onCancel = () => history.goBack()

  return (
    <Grid
      container
      spacing={3}
      direction="column"
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
            children="Select answer sheet to check"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify="center"
      >
        <PictureControl
          className={classes.sheetPaper}
          picture={sheet}
          onChange={setChangeSheet}
          onDelete={onDeleteSheet}
        />
      </Grid>
      <Grid
        item
        container
        justify="space-around"
      >
        <Button
          variant="contained"
          children="Cancel"
          onClick={onCancel}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!sheet || !quizId}
          children="Check"
          onClick={onCheck}
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  stepper: {
    marginBottom: theme.spacing(2)
  },
  sheetPaper: {
    height: theme.spacing(70),
    width: theme.spacing(70 * 0.7)
  }
}))
