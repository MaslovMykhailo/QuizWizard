import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Button, ButtonProps, Text} from '@ui-kitten/components'
import {QuizzesRoute, AppRoute} from '@constants'
import {FileAddIcon} from '@icons'

export const AddQuizButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()

  const route = useRoute()
  const {navigate} = useNavigation()

  const onPress = useCallback(
    () =>
      requestAnimationFrame(() =>
        navigate(
          route.name !== QuizzesRoute.AllQuizzes
            ? AppRoute.Quizzes
            : QuizzesRoute.NewQuiz
        )
      ),
    [navigate, route]
  )

  return (
    <Button {...props} onPress={onPress} accessoryLeft={FileAddIcon}>
      {(textProps) => <Text {...textProps} children={t<string>('ADD_QUIZ')} />}
    </Button>
  )
}
