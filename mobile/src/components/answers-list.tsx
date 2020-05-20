import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {SectionList} from 'react-native'

export const AnswersList: FC = observer(() => {
  return <SectionList sections={[]} />
})
