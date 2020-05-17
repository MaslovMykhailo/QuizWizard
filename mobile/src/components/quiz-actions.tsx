import React, {FC, useCallback} from 'react'
import {View, ViewProps} from 'react-native'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQuizzesStore} from '@providers'
import {QuizzesRoute} from '@constants'
import {UUID} from '@types'

export const QuizActions: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const route = useRoute()
  const {navigate} = useNavigation()

  const quizId = (route.params as {quizId?: UUID})?.quizId
  const quizzesStore = useQuizzesStore()

  const onCopy = useCallback(() => {
    if (quizId) {
      requestAnimationFrame(() => navigate(QuizzesRoute.NewQuiz, {quizId}))
    }
  }, [navigate, quizId])

  const onDelete = useCallback(() => {
    if (quizId) {
      requestAnimationFrame(() => {
        navigate(QuizzesRoute.AllQuizzes)
        quizzesStore.remove(quizId)
      })
    }
  }, [navigate, quizId, quizzesStore])

  return (
    <View {...props} style={[styles.root, props.style]}>
      <Button
        style={styles.action}
        onPress={onCopy}
        status="success"
        children={t<string>('COPY')}
      />
      <Button
        style={styles.action}
        onPress={onDelete}
        status="danger"
        children={t<string>('DELETE')}
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  action: {
    marginHorizontal: 24,
    width: 128
  }
})
