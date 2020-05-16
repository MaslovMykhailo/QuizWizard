import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {AnswerOption} from '@types'
import {
  ButtonProps,
  StyleService,
  Button,
  useStyleSheet,
  Text
} from '@ui-kitten/components'
import {useQuizStore} from '@providers'
import {TrashIcon} from '@icons'

const OPTIONS: AnswerOption[] = ['A', 'B', 'C', 'D', 'E']

export interface AnswerOptionsInput {
  readOnly?: boolean
  index: number
  options: Set<AnswerOption>
}

export const AnswerOptionsInput: FC<AnswerOptionsInput> = observer(
  ({index, options, readOnly}) => {
    const styles = useStyleSheet(themedStyles)
    const quizStore = useQuizStore()

    return (
      <View style={[styles.root, readOnly ? styles.readOnlyRoot : undefined]}>
        <Text style={styles.count} category="h5" children={index + 1} />
        {OPTIONS.map((option) => (
          <OptionButton
            key={`${index}-${option}`}
            appearance={options.has(option) ? 'filled' : 'outline'}
            size="small"
            children={option}
            onPress={
              !readOnly
                ? () => quizStore.toggleAnswerOption(index, option)
                : undefined
            }
          />
        ))}
        {!readOnly && <DeleteButton index={index} />}
      </View>
    )
  }
)

const OptionButton: FC<ButtonProps> = (props) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <Button {...props} style={[styles.optionButton, props.style]}>
      {(optionProps) => <Text {...optionProps}>{String(props.children)}</Text>}
    </Button>
  )
}

const DeleteButton: FC<ButtonProps & {index: number}> = observer(
  ({index, ...props}) => {
    const styles = useStyleSheet(themedStyles)
    const quizStore = useQuizStore()

    const onPress = useCallback(() => quizStore.removeAnswer(index), [
      index,
      quizStore
    ])

    return (
      <Button
        {...props}
        style={styles.deleteButton}
        status="danger"
        appearance="ghost"
        size="small"
        accessoryLeft={TrashIcon}
        onPress={onPress}
        disabled={!(quizStore.answersList.length > 1)}
      />
    )
  }
)

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  readOnlyRoot: {
    paddingRight: 12
  },
  optionButton: {
    borderRadius: 24,
    height: 42
  },
  count: {
    marginLeft: 6,
    width: 28
  },
  deleteButton: {
    width: 18
  }
})
