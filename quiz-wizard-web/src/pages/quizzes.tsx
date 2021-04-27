import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {
  useDispatch,
  selectAreQuizzesFetching,
  fetchQuizzes,
  selectAreAnswersFetching,
  fetchAnswers
} from 'quiz-wizard-redux'
import Typography from '@material-ui/core/Typography'

import {PageLoader} from '../components'

export function QuizzesPage() {
  const dispatch = useDispatch()

  const areQuizzesFetching = useSelector(selectAreQuizzesFetching)
  const areAnswersFetching = useSelector(selectAreAnswersFetching)

  const isMountedRef = useRef(false)

  useEffect(
    () => {
      isMountedRef.current = true
      dispatch(fetchQuizzes())
      dispatch(fetchAnswers())
    },
    [dispatch]
  )

  if (
    areQuizzesFetching ||
    areAnswersFetching ||
    !isMountedRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  return (
    <Typography children="Quizzes page" />
  )
}
