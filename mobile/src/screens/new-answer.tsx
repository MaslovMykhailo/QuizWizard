import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {
  Screen,
  QuizResultCard,
  ResponderView,
  CheckedOptionsList,
  ResultExplanation,
  AnswerNameInput,
  NewAnswerActions
} from '@components'
import {useAnswerStore} from '@providers'
import {QuizGrade} from '@icons'
import {useStyleSheet, StyleService} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native'
import {DetectionRoutes} from '@constants'

export const NewAnswerScreen: FC = observer(() => {
  const styles = useStyleSheet(themedStyles)
  const {navigate} = useNavigation()

  const answerStore = useAnswerStore()
  const checkedAnswers = answerStore.checkedAnswers

  const onResponderPress = useCallback(
    () => navigate(DetectionRoutes.Responders),
    [navigate]
  )

  return (
    <Screen level="2">
      <AnswerNameInput />
      <QuizResultCard headless quizId={answerStore.quizId}>
        <View style={styles.card}>
          <ResponderView
            style={styles.responder}
            responderId={answerStore.responderId}
            onPress={onResponderPress}
          />
          <QuizGrade style={styles.grade} grade={checkedAnswers.grade} />
        </View>
      </QuizResultCard>
      <CheckedOptionsList
        style={styles.list}
        checkedAnswers={checkedAnswers.options}
        ListHeaderComponent={ResultExplanation}
      />
      <NewAnswerActions />
    </Screen>
  )
})

const themedStyles = StyleService.create({
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  responder: {
    flex: 3
  },
  grade: {
    flex: 1
  },
  list: {
    marginTop: 12
  }
})
