import React, {FC, useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useRoute} from '@react-navigation/native'
import {useQuizzesStore, QuizStoreProvider} from '@providers'
import {QuizStore} from '@stores'
import {Screen, AnswerOptionList, QuizActions} from '@components'
import {UUID} from '@types'

export const QuizScreen: FC = observer(() => {
  const route = useRoute()
  const quizzesStore = useQuizzesStore()

  const quiz = quizzesStore.getQuizById(
    (route.params as {quizId: UUID})?.quizId
  )

  const [quizStore, setQuizStore] = useState(new QuizStore(quiz))
  useEffect(() => {
    setQuizStore(new QuizStore(quiz))
  }, [quiz])

  return (
    <QuizStoreProvider value={quizStore}>
      <Screen level="2">
        <AnswerOptionList readOnly />
        <QuizActions />
      </Screen>
    </QuizStoreProvider>
  )
})
