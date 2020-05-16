import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  List,
  Divider,
  Button,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import {useQuizStore} from '@providers'
import {AnswerOption} from '@types'
import {PlusIcon} from '@icons'

import {AnswerOptionsInput} from './answer-options-input'

export interface AnswerOptionListProps {
  readOnly?: boolean
}

export const AnswerOptionList: FC<AnswerOptionListProps> = observer(
  ({readOnly}) => {
    const quizStore = useQuizStore()

    const renderItem = useCallback(
      ({item, index}: {item: Set<AnswerOption>; index: number}) => (
        <AnswerOptionsInput index={index} options={item} readOnly={readOnly} />
      ),
      [readOnly]
    )

    return (
      <List
        data={quizStore.answersList}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={
          !readOnly && quizStore.canAddAnswer ? AddQuestion : null
        }
      />
    )
  }
)

const AddQuestion: FC = observer(() => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const quizStore = useQuizStore()

  return (
    <View style={styles.addQuestionWrapper}>
      <Button
        onPress={quizStore.addAnswer}
        accessoryLeft={PlusIcon}
        children={t<string>('ADD_QUESTION')}
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  addQuestionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})
