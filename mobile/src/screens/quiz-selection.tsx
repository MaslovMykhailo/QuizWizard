import React, {FC, useCallback, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {useQuizzesStore} from '@providers'
import {QuizzesList, Screen, NavigationHeader, Loader} from '@components'
import {UUID} from '@types'
import {useNavigation, useRoute} from '@react-navigation/native'

export const QuizSelectionScreen: FC = observer(() => {
  const [t] = useTranslation()
  const route = useRoute()
  const navigation = useNavigation()

  const canGoBack = useCallback(() => true, [])
  const getTitle = useCallback(() => t<string>('QUIZ_SELECTION_SCREEN_TITLE'), [
    t
  ])

  const quizzesStore = useQuizzesStore()
  const onQuizPress = useCallback((quizId: UUID) => {}, [])

  useEffect(() => {
    if (!quizzesStore.loaded) {
      quizzesStore.load()
    }
  }, [quizzesStore])

  return (
    <Screen>
      <NavigationHeader
        scene={{route} as any}
        navigation={navigation as any}
        getTitle={getTitle}
        canGoBack={canGoBack}
      />
      {quizzesStore.loaded ? (
        <QuizzesList
          quizzes={quizzesStore.quizzesList}
          onQuizPress={onQuizPress}
        />
      ) : (
        <Loader />
      )}
    </Screen>
  )
})
