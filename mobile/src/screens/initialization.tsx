import React, {FC} from 'react'
import {View} from 'react-native'
import {Spinner, StyleService, useStyleSheet} from '@ui-kitten/components'
import {Preview} from '@components'

export const InitializationScreen: FC = () => {
  const styles = useStyleSheet(themedStyles)

  return (
    <Preview>
      <View style={styles.spinnerWrapper}>
        <Spinner size="large" />
      </View>
    </Preview>
  )
}

const themedStyles = StyleService.create({
  spinnerWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})
