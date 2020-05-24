import React, {useCallback, FC} from 'react'
import {ListProps, List, Divider} from '@ui-kitten/components'
import {CheckedAnswerOptions} from '@types'

import {CheckedOptions} from './checked-options'

export interface CheckedOptionsList extends ListProps {
  checkedAnswers: CheckedAnswerOptions[]
}

export const CheckedOptionsList: FC<CheckedOptionsList> = ({
  checkedAnswers,
  ...props
}) => {
  const renderItem = useCallback(
    ({index, item}: {item: CheckedAnswerOptions; index: number}) => (
      <CheckedOptions index={index} checkedOptions={item} />
    ),
    []
  )

  return (
    <List
      {...props}
      data={checkedAnswers}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  )
}
