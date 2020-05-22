import React, {FC, useCallback, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {Route} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationHeader, Screen} from '@components'
import {useAnswersStore} from '@providers'
import {AnswersRoute} from '@constants'
import {UUID} from '@types'

import {AllAnswersScreen} from './all-answers'

const Stack = createStackNavigator()

export const AnswersScreen: FC = observer(() => {
  const [t] = useTranslation()

  const answers = useAnswersStore()
  useEffect(() => {
    answers.load()
  }, [answers])

  const getTitle = useCallback(
    (route: Route<string>) => {
      switch (route.name) {
        case AnswersRoute.Answer:
          return t<string>('ANSWER_SCREEN_TITLE')
        default:
          return t<string>('ALL_ANSWERS_SCREEN_TITLE')
      }
    },
    [t]
  )

  const getSubtitle = useCallback(
    ({params}: Route<string>) => {
      if (params && 'answerId' in params) {
        const {answerId} = params as {answerId: UUID}
        return answers.getAnswerById(answerId)?.name
      } else {
        return
      }
    },
    [answers]
  )

  const canGoBack = useCallback(
    (route: Route<string>) => route.name !== AnswersRoute.AllAnswers,
    []
  )

  const showLoadingIndicator = answers.someAnswerLoading

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
        name={AnswersRoute.AllAnswers}
        component={AllAnswersScreen}
      />
      <Stack.Screen name={AnswersRoute.Answer} component={Screen} />
    </Stack.Navigator>
  )
})
