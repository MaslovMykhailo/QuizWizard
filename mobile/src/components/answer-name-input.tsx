import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {View, ViewProps} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useAnswerStore} from '@providers'
import {Text, Input, StyleService, useStyleSheet} from '@ui-kitten/components'

export const AnswerNameInput: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const answerStore = useAnswerStore()

  return (
    <View {...props}>
      <Text
        category="h6"
        style={styles.label}
        children={t<string>('ANSWER_NAME_LABEL')}
      />
      <Input
        style={styles.input}
        value={answerStore.name}
        onChangeText={answerStore.changeName}
        autoCapitalize="sentences"
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  label: {
    textAlign: 'center',
    marginBottom: 6
  },
  input: {
    marginBottom: 6
  }
})
