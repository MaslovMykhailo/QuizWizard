import React, {FC, useCallback, memo} from 'react'
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

export const AnswerOptionsInput: FC<AnswerOptionsInput> = memo(
  ({index, options, readOnly}) => {
    const styles = useStyleSheet(themedStyles)

    return (
      <View style={[styles.root, readOnly ? styles.readOnlyRoot : undefined]}>
        <Text style={styles.count} category="h5" children={index + 1} />
        <Options index={index} options={options} readOnly={readOnly} />
        {!readOnly && <DeleteButton index={index} />}
      </View>
    )
  }
)

interface OptionsProps {
  index: number
  options: Set<AnswerOption>
  readOnly?: boolean
}

const Options: FC<OptionsProps> = observer(({index, options, readOnly}) => {
  const quizStore = useQuizStore()
  const onToggleOption = useCallback(
    (option: AnswerOption) => quizStore.toggleAnswerOption(index, option),
    [index, quizStore]
  )

  return (
    <>
      {OPTIONS.map((option) => (
        <OptionButton
          key={`${index}-${option}`}
          readOnly={readOnly}
          option={option}
          onToggleOption={onToggleOption}
          appearance={options.has(option) ? 'filled' : 'outline'}
          size="small"
        />
      ))}
    </>
  )
})

interface OptionButtonProps extends ButtonProps {
  option: AnswerOption
  onToggleOption(option: AnswerOption): void
  readOnly?: boolean
  appearance: string
}

const OptionButton: FC<OptionButtonProps> = ({
  option,
  onToggleOption,
  readOnly,
  ...props
}) => {
  const styles = useStyleSheet(themedStyles)
  const onPress = useCallback(() => onToggleOption(option), [
    onToggleOption,
    option
  ])

  return (
    <Button
      {...props}
      onPress={!readOnly ? onPress : undefined}
      style={[styles.optionButton, props.style]}>
      {(optionProps) => <Text {...optionProps}>{option}</Text>}
    </Button>
  )
}

const DeleteButton: FC<ButtonProps & {index: number}> = observer(
  ({index, ...props}) => {
    const styles = useStyleSheet(themedStyles)
    const quizStore = useQuizStore()

    const onPress = useCallback(
      () => requestAnimationFrame(() => quizStore.removeAnswer(index)),
      [index, quizStore]
    )

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
