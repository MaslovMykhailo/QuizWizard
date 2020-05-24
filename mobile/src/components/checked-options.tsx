import React, {FC, useMemo} from 'react'
import {ViewProps, View} from 'react-native'
import {CheckedAnswerOptions, CheckedAnswerOption, AnswerOption} from '@types'
import {StyleService, useStyleSheet, Text} from '@ui-kitten/components'
import {OPTIONS} from '@constants'

export interface CheckedAnswerOptionsProps extends ViewProps {
  index: number
  checkedOptions: CheckedAnswerOptions
}

export const CheckedOptions: FC<CheckedAnswerOptionsProps> = ({
  index,
  checkedOptions,
  style,
  ...props
}) => {
  const styles = useStyleSheet(themedStyles)

  return (
    <View {...props} style={[styles.root, style]}>
      <Text category="h5" style={styles.counter} children={index + 1} />
      {OPTIONS.map((option) => (
        <CheckedOption
          key={`${index}-${option}`}
          option={option}
          checkedOption={checkedOptions.find(
            (answer) => answer.option === option
          )}
        />
      ))}
    </View>
  )
}

interface CheckedOptionProps extends ViewProps {
  option: AnswerOption
  checkedOption?: CheckedAnswerOption
}

const CheckedOption: FC<CheckedOptionProps> = ({option, checkedOption}) => {
  const styles = useStyleSheet(themedStyles)

  const {status, style} = useMemo(
    () =>
      checkedOption
        ? checkedOption.correct
          ? {status: 'success', style: styles.correctOption}
          : checkedOption.missed
          ? {status: 'warning', style: styles.missedOption}
          : {status: 'danger', style: styles.incorrectOption}
        : {status: 'primary'},
    [
      checkedOption,
      styles.correctOption,
      styles.incorrectOption,
      styles.missedOption
    ]
  )

  return (
    <View style={[styles.option, style]}>
      <Text status={status} children={option} />
    </View>
  )
}

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6
  },
  counter: {
    width: 28
  },
  option: {
    height: 42,
    width: 42,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'border-primary-color-1',
    backgroundColor: 'color-primary-transparent-100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  correctOption: {
    borderColor: 'border-success-color-1',
    backgroundColor: 'color-success-transparent-100'
  },
  incorrectOption: {
    borderColor: 'border-danger-color-1',
    backgroundColor: 'color-danger-transparent-100'
  },
  missedOption: {
    borderColor: 'border-warning-color-1',
    backgroundColor: 'color-warning-transparent-100'
  }
})
