import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {
  useDispatch,
  selectAreQuizzesFetching,
  fetchQuizzes,
  selectSortedQuizzesInfo,
  deleteQuiz
} from 'quiz-wizard-redux'
import {QuizId} from 'quiz-wizard-schema'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PostAddIcon from '@material-ui/icons/PostAdd'

import {AddListItemButton, PageLoader, QuizList} from '../components'
import {Path} from '../routes'

export function QuizzesPage() {
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
    history.push(Path.quiz(quizId))

  const onCreateFromQuiz = (quizId: QuizId) =>
    history.push(Path.newQuiz(quizId))

  const onCheckQuiz = (quizId: QuizId) =>
    history.push(Path.newAnswer(quizId))

  const onDeleteQuiz = (quizId: QuizId) =>
    dispatch(deleteQuiz(quizId))

  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h3"
          children="Quizzes list"
        />
      </Grid>
      <Grid item>
        <Paper>
          <QuizList
            quizzes={quizzes}
            onClickQuiz={onClickQuiz}
            onCreateFromQuiz={onCreateFromQuiz}
            onCheckQuiz={onCheckQuiz}
            onDeleteQuiz={onDeleteQuiz}
          />
        </Paper>
      </Grid>
      <Grid item>
        <AddListItemButton
          addItemPath={Path.newQuiz()}
          icon={<PostAddIcon fontSize="large" />}
        />
      </Grid>
    </Grid>
  )
}
