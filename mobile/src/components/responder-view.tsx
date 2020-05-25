import React, {FC, JSXElementConstructor} from 'react'
import {ViewProps, View, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components'
import {ResponderId} from '@types'

import {Responder} from './responder'

export interface ResponderViewProps extends ViewProps {
  responderId?: ResponderId
  onPress?(): void
}

export const ResponderView: FC<ResponderViewProps> = ({
  responderId,
  style,
  onPress,
  ...props
}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const Root: JSXElementConstructor<any> = onPress ? TouchableOpacity : View

  return (
    <Root {...props} onPress={onPress} style={[styles.root, style]}>
      <Text category="h6" children={t<string>('RESPONDER_CAPTION')} />
      <Responder style={styles.responder} responderId={responderId} />
    </Root>
  )
}

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  responder: {
    marginTop: 9
  }
})
