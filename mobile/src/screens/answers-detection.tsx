import React, {FC, useState, useEffect, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {useRoute, Route} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {AnswerStore} from '@stores'
import {useQuizzesStore, AnswerStoreProvider} from '@providers'
import {NavigationHeader} from '@components'
import {DetectionRoutes} from '@constants'
import {UUID} from '@types'

import {DetectionScreen} from './detection'
import {NewAnswerScreen} from './new-answer'
import {RespondersScreen} from './responders'

const Stack = createStackNavigator()

export const AnswersDetectionScreen: FC = observer(() => {
  const [t] = useTranslation()
  const route = useRoute()

  const quizzesStore = useQuizzesStore()
  const quiz = quizzesStore.getQuizById(
    (route.params as {quizId: UUID})?.quizId
  )

  const [answerStore, setAnswerStore] = useState(new AnswerStore(quiz!))
  useEffect(() => {
    setAnswerStore(new AnswerStore(quiz!))
  }, [quiz])

  const getTitle = useCallback(
    ({name}: Route<string>) => {
      switch (name) {
        case DetectionRoutes.Responders:
          return t<string>('RESPONDERS_SCREEN_TITLE')
        default:
          return t<string>('NEW_ANSWER_SCREEN_TITLE')
      }
    },
    [t]
  )

  const canGoBack = useCallback(
    ({name}: Route<string>) => name === DetectionRoutes.Responders,
    []
  )

  return (
    <AnswerStoreProvider value={answerStore}>
      <Stack.Navigator
        screenOptions={{
          header: (headerProps) => (
            <NavigationHeader
              getTitle={getTitle}
              canGoBack={canGoBack}
              {...headerProps}
            />
          )
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name={DetectionRoutes.Detection}
          component={DetectionScreen}
        />
        <Stack.Screen
          name={DetectionRoutes.NewAnswer}
          component={NewAnswerScreen}
        />
        <Stack.Screen
          name={DetectionRoutes.Responders}
          component={RespondersScreen}
        />
      </Stack.Navigator>
    </AnswerStoreProvider>
  )
})
