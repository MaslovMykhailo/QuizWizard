import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {ViewProps, View} from 'react-native'
import {useQuizzesStore} from '@providers'
import {CardProps, Card, Text} from '@ui-kitten/components'
import {UUID} from '@types'

export interface QuizResultCardProps extends CardProps {
  quizId: UUID
}

export const QuizResultCard: FC<QuizResultCardProps> = observer(
  ({quizId, ...props}) => {
    const quizzesStore = useQuizzesStore()

    const quiz = quizzesStore.getQuizById(quizId)

    const renderHeader = useCallback(
      (viewProps?: ViewProps) => (
        <View {...viewProps}>
          <Text category="h4" children={quiz?.name} />
        </View>
      ),
      [quiz]
    )

    if (!quiz) {
      return null
    }

    return <Card {...props} disabled header={renderHeader} />
  }
)
