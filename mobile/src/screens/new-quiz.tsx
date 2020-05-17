import React, {FC, useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useRoute} from '@react-navigation/native'
import {QuizStoreProvider, useQuizzesStore} from '@providers'
import {QuizStore} from '@stores'
import {
  Screen,
  AnswerOptionList,
  QuizNameInput,
  NewQuizActions
} from '@components'
import {UUID} from '@types'

export const NewQuizScreen: FC = observer(() => {
  const route = useRoute()
  const quizzesStore = useQuizzesStore()

  const quiz = quizzesStore.getQuizById(
    (route.params as {quizId: UUID})?.quizId
  )

  const [quizStore, setQuizStore] = useState(new QuizStore(quiz, true))
  useEffect(() => {
    setQuizStore(new QuizStore(quiz, true))
  }, [quiz])

  return (
    <QuizStoreProvider value={quizStore}>
      <Screen level="2">
        <QuizNameInput />
        <AnswerOptionList />
        <NewQuizActions />
      </Screen>
    </QuizStoreProvider>
  )
})
