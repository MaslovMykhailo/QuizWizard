import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonProps, Text} from '@ui-kitten/components'
import {FileAddIcon} from '@icons'

export const AddQuizButton: FC<ButtonProps> = (props) => {
  const [t] = useTranslation()

  return (
    <Button {...props} accessoryLeft={FileAddIcon}>
      {(textProps) => <Text {...textProps} children={t<string>('ADD_QUIZ')} />}
    </Button>
  )
}
