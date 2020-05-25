import React, {FC} from 'react'
import {ViewProps, View} from 'react-native'
import {useStyleSheet, Spinner, StyleService} from '@ui-kitten/components'

export const Loader: FC<ViewProps> = ({style, ...props}) => {
  const styles = useStyleSheet(themedStyles)

  return (
    <View {...props} style={[styles.root, style]}>
      <Spinner size="giant" />
      {props.children}
    </View>
  )
}

const themedStyles = StyleService.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
