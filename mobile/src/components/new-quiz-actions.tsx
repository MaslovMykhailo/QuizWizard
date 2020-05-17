import React, {FC, useCallback} from 'react'
import {View, ViewProps} from 'react-native'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native'
import {useQuizStore, useQuizzesStore} from '@providers'
import {QuizzesRoute} from '@constants'

export const NewQuizActions: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const quizStore = useQuizStore()
  const quizzesStore = useQuizzesStore()
  const {navigate} = useNavigation()

  const onCancel = useCallback(
    () =>
      requestAnimationFrame(() => {
        navigate(QuizzesRoute.AllQuizzes)
        quizStore.reset()
      }),
    [navigate, quizStore]
  )

  const onSave = useCallback(
    () =>
      requestAnimationFrame(() => {
        quizzesStore.add(quizStore.quiz)
        navigate(QuizzesRoute.AllQuizzes)
        quizStore.reset()
      }),
    [navigate, quizStore, quizzesStore]
  )

  return (
    <View {...props} style={[styles.root, props.style]}>
      <Button
        style={styles.action}
        status="danger"
        onPress={onCancel}
        children={t<string>('CANCEL')}
      />
      <Button
        style={styles.action}
        status="success"
        onPress={onSave}
        children={t<string>('SAVE')}
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
