import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {View} from 'react-native'
import {useAnswersStore} from '@providers'
import {Screen, AnswersList} from '@components'
import {useStyleSheet, StyleService, Spinner} from '@ui-kitten/components'

export const AllAnswersScreen: FC = observer(() => {
  const styles = useStyleSheet(themedStyles)
  const answersStore = useAnswersStore()

  return (
    <Screen level="3">
      {!answersStore.loaded ? (
        <View style={styles.loaderWrapper}>
          <Spinner size="giant" />
        </View>
      ) : (
        <AnswersList />
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
