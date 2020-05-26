import React, {FC} from 'react'
import {View} from 'react-native'
import {StyleService, useStyleSheet, Divider} from '@ui-kitten/components'
import {
  Screen,
  UserProfile,
  AddQuizButton,
  AddQuizAnswersButton,
  DownloadSheetButton
} from '@components'

export const HomeScreen: FC = () => {
  const styles = useStyleSheet(themedStyles)

  return (
    <Screen>
      <UserProfile />
      <View style={styles.actionsWrapper}>
        <AddQuizButton />
        <AddQuizAnswersButton />
        <Divider style={styles.divider} />
        <DownloadSheetButton />
      </View>
    </Screen>
  )
}

const themedStyles = StyleService.create({
  actionsWrapper: {
    margin: 24,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  divider: {
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 24
  }
})
