import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Screen,
  QuizResultCard,
  ResponderView,
  CheckedOptionsList,
  ResultExplanation
} from '@components'
import {useRoute, useNavigation} from '@react-navigation/native'
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components'
import {useAnswersStore} from '@providers'
import {QuizGrade} from '@icons'
import {UUID} from '@types'
import {AnswersRoute} from '@constants'

export const AnswerScreen: FC = observer(() => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const route = useRoute()
  const {navigate} = useNavigation()

  const answersStore = useAnswersStore()
  const answer = answersStore.getAnswerById(
    (route.params as {answerId: UUID})?.answerId
  )

  const onDeleteAnswer = useCallback(() => {
    if (answer) {
      answersStore.remove(answer.id)
      navigate(AnswersRoute.AllAnswers)
    }
  }, [answer, answersStore, navigate])

  const renderDeleteAnswerButton = useCallback(
    () => (
      <View style={styles.deleteButtonWrapper}>
        <Button
          status="danger"
          onPress={() => requestAnimationFrame(onDeleteAnswer)}
          children={t<string>('DELETE')}
        />
      </View>
    ),
    [onDeleteAnswer, styles.deleteButtonWrapper, t]
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
      <CheckedOptionsList
        style={styles.list}
        checkedAnswers={checkedAnswers.options}
        ListHeaderComponent={ResultExplanation}
        ListFooterComponent={renderDeleteAnswerButton}
      />
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
  },
  deleteButtonWrapper: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
