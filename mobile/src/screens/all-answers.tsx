import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useAnswersStore} from '@providers'
import {Screen, AnswersList} from '@components'
import {useStyleSheet, StyleService, Spinner} from '@ui-kitten/components'
import {AnswersRoute} from '@constants'
import {UUID} from '@types'

export const AllAnswersScreen: FC = observer(() => {
  const styles = useStyleSheet(themedStyles)
  const {navigate} = useNavigation()
  const answersStore = useAnswersStore()

  const onAnswerPress = useCallback(
    (answerId: UUID) => navigate(AnswersRoute.Answer, {answerId}),
    [navigate]
  )

  return (
    <Screen level="3">
      {!answersStore.loaded ? (
        <View style={styles.loaderWrapper}>
          <Spinner size="giant" />
        </View>
      ) : (
        <AnswersList onAnswerPress={onAnswerPress} />
      )}
    </Screen>
  )
})

const themedStyles = StyleService.create({
  loaderWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
