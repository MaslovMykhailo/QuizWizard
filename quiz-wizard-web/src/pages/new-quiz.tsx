import {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {NewQuizSchema} from 'quiz-wizard-schema'
import {
  createQuiz,
  fetchQuiz,
  useDispatch,
  selectIsQuizCreatingGetter,
  selectIsQuizFetchingGetter,
  selectQuizGetter
} from 'quiz-wizard-redux'

import {PageLoader, QuizForm} from '../components'
import {useQuery} from '../hooks'

export function NewQuizPage() {
  const dispatch = useDispatch()

  const query = useQuery()
  const history = useHistory()

  const getQuiz = useSelector(selectQuizGetter)
  const getIsQuizCreating = useSelector(selectIsQuizCreatingGetter)
  const getIsQuizFetching = useSelector(selectIsQuizFetchingGetter)

  const originQuizId = query.get('origin')
  const originQuiz = originQuizId ? getQuiz(originQuizId) : undefined
  const isOriginFetching = originQuizId ? getIsQuizFetching(originQuizId) : false

  const [newQuizId, setNewQuizId] = useState<string | undefined>(undefined)
  const isCreating = newQuizId ? getIsQuizCreating(newQuizId) : false

  const waitForUpdateRef = useRef(true)

  useEffect(
    () => {
      waitForUpdateRef.current = false

      if (originQuizId) {
        dispatch(fetchQuiz(originQuizId))
      }
    },
    [dispatch, originQuizId]
  )

  if (isCreating || isOriginFetching || waitForUpdateRef.current) {
    return (
      <PageLoader />
    )
  }

  const onCreate = (quiz: NewQuizSchema) => {
    setNewQuizId(quiz.id)
    waitForUpdateRef.current = true
    dispatch(createQuiz(quiz))
      .then(() => history.goBack())
      .finally(() => {
        setNewQuizId(undefined)
        waitForUpdateRef.current = false
      })
  }

  const onCancel = () => history.goBack()

  return (
    <QuizForm
      quiz={originQuiz}
      onCreate={onCreate}
      onCancel={onCancel}
    />
  )
}
