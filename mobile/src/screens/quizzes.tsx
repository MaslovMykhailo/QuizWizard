import React, {FC, useCallback, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {Route} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationHeader} from '@components'
import {useQuizzesStore} from '@providers'
import {QuizzesRoute} from '@constants'
import {UUID} from '@types'

import {AllQuizzesScreen} from './all-quizzes'
import {QuizScreen} from './quiz'
import {NewQuizScreen} from './new-quiz'

const Stack = createStackNavigator()

export const QuizzesScreen: FC = observer(() => {
  const [t] = useTranslation()

  const quizzesStore = useQuizzesStore()
  useEffect(() => {
    quizzesStore.load()
  }, [quizzesStore])

  const getTitle = useCallback(
    (route: Route<string>) => {
      switch (route.name) {
        case QuizzesRoute.Quiz:
          return t<string>('QUIZ_SCREEN_TITLE')
        case QuizzesRoute.NewQuiz:
          return t<string>('NEW_QUIZ_SCREEN_TITLE')
        default:
          return t<string>('ALL_QUIZZES_SCREEN_TITLE')
      }
    },
    [t]
  )

  const getSubtitle = useCallback(
    ({params}: Route<string>) => {
      if (params && 'quizId' in params) {
        const {quizId} = params as {quizId: UUID}
        return quizzesStore.getQuizById(quizId)?.name
      } else {
        return
      }
    },
    [quizzesStore]
  )

  const canGoBack = useCallback(
    (route: Route<string>) => route.name !== QuizzesRoute.AllQuizzes,
    []
  )

  const showLoadingIndicator = quizzesStore.someQuizLoading

  const navigationHeaderProps = {
    getTitle,
    getSubtitle,
    canGoBack,
    showLoadingIndicator
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: (headerProps) => (
          <NavigationHeader {...navigationHeaderProps} {...headerProps} />
        )
      }}>
      <Stack.Screen
        name={QuizzesRoute.AllQuizzes}
        component={AllQuizzesScreen}
      />
      <Stack.Screen name={QuizzesRoute.Quiz} component={QuizScreen} />
      <Stack.Screen name={QuizzesRoute.NewQuiz} component={NewQuizScreen} />
    </Stack.Navigator>
  )
})
