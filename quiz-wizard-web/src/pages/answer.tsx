import {useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {AnswerId} from 'quiz-wizard-schema'
import {
  deleteAnswer,
  fetchAnswer,
  fetchQuiz,
  fetchStudent,
  selectAnswerGetter,
  selectIsAnswerDeletingGetter,
  selectIsAnswerFetchingGetter,
  selectIsQuizFetchingGetter,
  selectIsStudentFetchingGetter,
  selectQuizGetter,
  selectStudentGetter,
  useDispatch
} from 'quiz-wizard-redux'
import Typography from '@material-ui/core/Typography'

import {AnswerView, PageLoader} from '../components'

export function AnswerPage() {
  const [t] = useTranslation()

  const history = useHistory()
  const dispatch = useDispatch()

  const {answerId} = useParams<{answerId: AnswerId}>()

  const answer = useSelector(selectAnswerGetter)(answerId)
  const isAnswerFetching = useSelector(selectIsAnswerFetchingGetter)(answerId)
  const isAnswerDeleting = useSelector(selectIsAnswerDeletingGetter)(answerId)

  const waitForUpdateRef = useRef(true)
  useEffect(
    () => {
      dispatch(fetchAnswer(answerId))
      waitForUpdateRef.current = false
    },
    [dispatch, answerId]
  )

  const getStudent = useSelector(selectStudentGetter)
  const getIsStudentFetching = useSelector(selectIsStudentFetchingGetter)

  const student = answer?.student ? getStudent(answer.student) : undefined
  const isStudentFetching = answer?.student ? getIsStudentFetching(answer.student) : false

  const getQuiz = useSelector(selectQuizGetter)
  const getIsQuizFetching = useSelector(selectIsQuizFetchingGetter)

  const quiz = answer ? getQuiz(answer.quiz) : undefined
  const isQuizFetching = answer ? getIsQuizFetching(answer.quiz) : false

  useEffect(
    () => {
      if (answer) {
        dispatch(fetchQuiz(answer.quiz))
        answer.student && dispatch(fetchStudent(answer.student))
      }
    },
    [dispatch, answer]
  )

  if (
    isAnswerFetching ||
    isAnswerDeleting ||
    isStudentFetching ||
    isQuizFetching ||
    waitForUpdateRef.current
  ) {
    return (
      <PageLoader />
    )
  }

  if (!answerId || !answer || !quiz) {
    return (
      <Typography
        variant="h3"
        color="secondary"
        children={t('ANSWER_NOT_FOUND')}
      />
    )
  }

  const onDelete = () => {
    waitForUpdateRef.current = true
    dispatch(deleteAnswer(answerId))
      .then(() => history.goBack())
      .finally(() => waitForUpdateRef.current = false)
  }

  return (
    <AnswerView
      answer={answer}
      quiz={quiz}
      student={student}
      onDelete={onDelete}
    />
  )
}
