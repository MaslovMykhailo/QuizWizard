import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useAnswersStore} from '@providers'
import {Screen, AnswersList, Loader, AddQuizAnswersButton} from '@components'
import {AnswersRoute} from '@constants'
import {UUID} from '@types'
import {StyleService, useStyleSheet} from '@ui-kitten/components'

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
        <Loader />
      ) : (
        <>
          <AnswersList onAnswerPress={onAnswerPress} />
          <View style={styles.addAnswersButtonWrapper}>
            <AddQuizAnswersButton />
          </View>
        </>
      )}
    </Screen>
  )
})

const themedStyles = StyleService.create({
  addAnswersButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  }
})
