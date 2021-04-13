import React, {FC} from 'react'
import {SafeAreaView, ViewProps} from 'react-native'
import {StyleService, useStyleSheet} from '@ui-kitten/components'

export const SafeArea: FC<ViewProps> = ({style, ...props}) => {
  const styles = useStyleSheet(themedStyles)
  return <SafeAreaView {...props} style={[styles.root, style]} />
}

const themedStyles = StyleService.create({
  root: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  }
})
