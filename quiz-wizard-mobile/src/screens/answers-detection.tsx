import React, {FC, useState, useEffect, useCallback, useMemo} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {useRoute, Route, useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {AnswerStore} from '@stores'
import {useQuizzesStore, AnswerStoreProvider} from '@providers'
import {NavigationHeader} from '@components'
import {DetectionRoutes} from '@constants'
import {UUID} from '@types'

import {DetectionScreen} from './detection'
import {NewAnswerScreen} from './new-answer'
import {RespondersScreen} from './responders'
import {AnswerSheetScreen} from './answer-sheet'

const Stack = createStackNavigator()

export const AnswersDetectionScreen: FC = observer(() => {
  const [t] = useTranslation()
  const route = useRoute()
  const {navigate} = useNavigation()

  const quizzesStore = useQuizzesStore()
  const quizId = useMemo(() => (route.params as {quizId: UUID})?.quizId, [
    route.params
  ])

  const [answerStore, setAnswerStore] = useState(
    new AnswerStore(quizzesStore.getQuizById(quizId)!)
  )
  useEffect(() => {
    const quiz = quizzesStore.getQuizById(quizId)
    if (quiz) {
      setAnswerStore(new AnswerStore(quiz))
    }
  }, [navigate, quizId, quizzesStore])

  const getTitle = useCallback(
    ({name}: Route<string>) => {
      switch (name) {
        case DetectionRoutes.AnswerSheet:
          return t<string>('ANSWER_SHEET_SCREEN_TITLE')
        case DetectionRoutes.Responders:
          return t<string>('RESPONDERS_SCREEN_TITLE')
        default:
          return t<string>('NEW_ANSWER_SCREEN_TITLE')
      }
    },
    [t]
  )

  const canGoBack = useCallback(
    ({name}: Route<string>) =>
      name === DetectionRoutes.Responders ||
      name === DetectionRoutes.AnswerSheet,
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
        <Stack.Screen
          name={DetectionRoutes.AnswerSheet}
          component={AnswerSheetScreen}
        />
      </Stack.Navigator>
    </AnswerStoreProvider>
  )
})
