import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'
import {Button, Text, ButtonProps} from '@ui-kitten/components'
import {CameraIcon} from '@icons'
import {AppRoute} from '@constants'

export const AddQuizAnswersButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()
  const {navigate} = useNavigation()

  const onPress = useCallback(
    () => requestAnimationFrame(() => navigate(AppRoute.QuizSelection)),
    [navigate]
  )

  return (
    <Button {...props} onPress={onPress} accessoryLeft={CameraIcon}>
      {(textProps) => (
        <Text {...textProps} children={t<string>('ADD_QUIZ_ANSWERS')} />
      )}
    </Button>
  )
}
