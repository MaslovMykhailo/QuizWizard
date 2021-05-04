import {useEffect, useRef} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import {
  useDispatch,
  selectAnswersByQuizzes,
  fetchQuizzes,
  fetchAnswers,
  selectAreQuizzesFetching,
  selectAreAnswersFetching,
  fetchGroups,
  fetchStudents,
  selectAreGroupsFetching,
  selectAreStudentsFetching
} from 'quiz-wizard-redux'
import {AnswerId} from 'quiz-wizard-schema'

import {AddListItemButton, AnswersList, PageLoader} from '../components'
import {Path} from '../routes'

export function AnswersPage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const answersByQuizzes = useSelector(selectAnswersByQuizzes)

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      dispatch(fetchGroups())
      dispatch(fetchStudents())
      dispatch(fetchQuizzes())
      dispatch(fetchAnswers())

      isMountedRef.current = true
    },
    [dispatch]
  )

  const areGroupsFetching = useSelector(selectAreGroupsFetching)
  const areStudentsFetching = useSelector(selectAreStudentsFetching)
  const areQuizzesFetching = useSelector(selectAreQuizzesFetching)
  const areAnswersFetching = useSelector(selectAreAnswersFetching)

  if (
    areGroupsFetching ||
    areStudentsFetching ||
    areQuizzesFetching ||
    areAnswersFetching ||
    !isMountedRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  const onAnswerClick = (answerId: AnswerId) =>
    history.push(Path.answer(answerId))

  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <Typography
          variant="h3"
          children="Answers list"
        />
      </Grid>
      <Grid item>
        <AnswersList
          onAnswerClick={onAnswerClick}
          answersByQuizList={answersByQuizzes}
        />
      </Grid>
      <Grid item>
        <AddListItemButton
          addItemPath={Path.newAnswer()}
          icon={<DoneAllIcon fontSize="large" />}
        />
      </Grid>
    </Grid>
  )
}
