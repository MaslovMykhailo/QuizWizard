import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {Screen, QuizResultCard, ResponderView} from '@components'
import {useRoute} from '@react-navigation/native'
import {StyleService, useStyleSheet} from '@ui-kitten/components'
import {useAnswersStore} from '@providers'
import {QuizGrade} from '@icons'
import {UUID} from '@types'

export const AnswerScreen: FC = observer(() => {
  const styles = useStyleSheet(themedStyles)

  const route = useRoute()
  const answersStore = useAnswersStore()

  const answer = answersStore.getAnswerById(
    (route.params as {answerId: UUID})?.answerId
  )

  if (!answer) {
    return null
  }

  const checkedAnswers = answersStore.getCheckedAnswers(answer.id)

  if (!checkedAnswers) {
    return null
  }

  return (
    <Screen level="2">
      <QuizResultCard quizId={answer.quizId}>
        <View style={styles.card}>
          <ResponderView
            style={styles.responder}
            responderId={answer.responderId}
          />
          <QuizGrade style={styles.grade} grade={checkedAnswers.grade} />
        </View>
      </QuizResultCard>
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
  }
})
