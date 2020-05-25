import React, {FC, useCallback} from 'react'
import {View, ViewProps} from 'react-native'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components'
import {useNavigation} from '@react-navigation/native'
import {useAnswerStore, useAnswersStore} from '@providers'
import {AppRoute} from '@constants'

export const NewAnswerActions: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const answerStore = useAnswerStore()
  const answersStore = useAnswersStore()
  const {navigate} = useNavigation()

  const onCancel = useCallback(
    () =>
      requestAnimationFrame(() => {
        navigate(AppRoute.Answers)
      }),
    [navigate]
  )

  const onSave = useCallback(
    () =>
      requestAnimationFrame(() => {
        answersStore.add(answerStore.answer)
        navigate(AppRoute.Answers)
      }),
    [navigate, answerStore, answersStore]
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
