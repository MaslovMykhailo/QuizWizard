import React, {FC, useCallback, useEffect, useMemo} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {Route} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Screen, NavigationHeader} from '@components'
import {useQuizzesStore} from '@providers'

import {QuizzesRoute} from './routes'
import {AllQuizzesScreen} from './all-quizzes'

const Stack = createStackNavigator()

export const QuizzesScreen: FC = observer(() => {
  const [t] = useTranslation()

  const quizzesStore = useQuizzesStore()
  useEffect(() => {
    quizzesStore.load()
  }, [quizzesStore])

  // const isFocused = useIsFocused()
  // useEffect(() => {
  //   if (isFocused) {
  //     quizzesStore.load()
  //   }
  // }, [isFocused, quizzesStore])

  const showLoadingIndicator = useMemo(
    () => Boolean(quizzesStore.quizzes.data && quizzesStore.quizzes.loading),
    [quizzesStore.quizzes.data, quizzesStore.quizzes.loading]
  )

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
    ({params}: Route<string>) =>
      params && (params as {subtitle?: string}).subtitle,
    []
  )

  const canGoBack = useCallback(
    (route: Route<string>) => route.name !== QuizzesRoute.AllQuizzes,
    []
  )

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
      <Stack.Screen name="AllQuizzes" component={AllQuizzesScreen} />
      <Stack.Screen
        name="Quiz"
        initialParams={{subtitle: 'sub'}}
        component={Screen}
      />
    </Stack.Navigator>
  )
})
