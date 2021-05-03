import {useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router'
import {useSelector} from 'react-redux'
import {
  fetchQuiz,
  deleteQuiz,
  useDispatch,
  selectIsQuizDeletingGetter,
  selectIsQuizFetchingGetter,
  selectQuizGetter
} from 'quiz-wizard-redux'

import {PageLoader, QuizForm} from '../components'

export function QuizPage() {
  const dispatch = useDispatch()

  const history = useHistory()
  const {quizId} = useParams<{quizId: string}>()

  const quiz = useSelector(selectQuizGetter)(quizId)
  const isFetching = useSelector(selectIsQuizFetchingGetter)(quizId)
  const isDeleting = useSelector(selectIsQuizDeletingGetter)(quizId)

  const waitForUpdateRef = useRef(true)

  useEffect(
    () => {
      dispatch(fetchQuiz(quizId))
      waitForUpdateRef.current = false
    },
    [quizId, dispatch]
  )

  if (isFetching || isDeleting || waitForUpdateRef.current) {
    return (
      <PageLoader />
    )
  }

  const onDelete = () => {
    waitForUpdateRef.current = true
    dispatch(deleteQuiz(quizId))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  const onCancel = () => history.goBack()

  return (
    <QuizForm
      readOnly
      quiz={quiz}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  )
}
