import React, {FC} from 'react'
import {ViewProps, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components'
import {ResponderId} from '@types'

import {Responder} from './responder'

export interface ResponderViewProps extends ViewProps {
  responderId?: ResponderId
}

export const ResponderView: FC<ResponderViewProps> = ({
  responderId,
  style,
  ...props
}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <View {...props} style={[styles.root, style]}>
      <Text category="h5" children={t<string>('RESPONDER_CAPTION')} />
      <Responder style={styles.responder} responderId={responderId} />
    </View>
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
