import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {View, ViewProps} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, Input, StyleService, useStyleSheet} from '@ui-kitten/components'
import {useQuizStore} from '@providers'

export const QuizNameInput: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const quizStore = useQuizStore()

  return (
    <View {...props}>
      <Text
        category="h5"
        style={styles.label}
        children={t<string>('QUIZ_NAME_LABEL')}
      />
      <Input
        value={quizStore.name}
        onChangeText={quizStore.changeName}
        placeholder={t<string>('QUIZ_NAME_PLACEHOLDER')}
        autoCapitalize="sentences"
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  label: {
    textAlign: 'center',
    marginBottom: 6
  }
})
