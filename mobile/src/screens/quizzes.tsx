import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {createStackNavigator} from '@react-navigation/stack'
import {Screen, NavigationHeader} from '@components'
import {Button} from '@ui-kitten/components'
import {useNavigation, Route} from '@react-navigation/native'

import {QuizzesRoute} from './routes'

const Stack = createStackNavigator()

export const QuizzesScreen: FC = observer(() => {
  const [t] = useTranslation()

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

  const navigationHeaderProps = {getTitle, getSubtitle, canGoBack}

  return (
    <Stack.Navigator
      screenOptions={{
        header: (headerProps) => (
          <NavigationHeader {...navigationHeaderProps} {...headerProps} />
        )
      }}>
      <Stack.Screen name="AllQuizzes" component={S} />
      <Stack.Screen
        name="Quiz"
        initialParams={{subtitle: 'sub'}}
        component={S}
      />
    </Stack.Navigator>
  )
})

const S: FC = (props: any) => {
  const {navigate} = useNavigation()
  return (
    <Screen {...props} style={{flex: 1, height: '100%'}} level="2">
      <Button onPress={() => navigate('Quiz')} children="press" />
    </Screen>
  )
}
