import React, {useCallback, FC} from 'react'
import {useTranslation} from 'react-i18next'
import {ListProps, List, Divider, Text} from '@ui-kitten/components'
import {CheckedAnswerOptions} from '@types'

import {CheckedOptions} from './checked-options'

export interface CheckedOptionsList extends ListProps {
  checkedAnswers: CheckedAnswerOptions[]
}

export const CheckedOptionsList: FC<CheckedOptionsList> = ({
  checkedAnswers,
  ...props
}) => {
  const [t] = useTranslation()

  const renderItem = useCallback(
    ({index, item}: {item: CheckedAnswerOptions; index: number}) => (
      <CheckedOptions index={index} checkedOptions={item} />
    ),
    []
  )

  const renderNoAnswers = useCallback(
    () => <Text category="h6" children={t<string>('NO_ANSWERS')} />,
    [t]
  )

  return (
    <List
      {...props}
      data={checkedAnswers}
      renderItem={renderItem}
      ListEmptyComponent={renderNoAnswers}
      ItemSeparatorComponent={Divider}
    />
  )
}
