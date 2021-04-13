import React, {FC} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components'

export const Preview: FC = ({children}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.root}>
      <View style={[styles.wrapper, styles.appNameWrapper]}>
        <Text
          category="h1"
          selectable={false}
          style={styles.text}
          children={t<string>('APP_NAME')}
        />
      </View>
      {children}
      <View style={[styles.wrapper, styles.appLabelWrapper]}>
        <Text
          category="label"
          selectable={false}
          style={styles.text}
          children={t<string>('APP_CORPORATION_LABEL')}
        />
      </View>
    </View>
  )
}

const themedStyles = StyleService.create({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'color-basic-100'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-basic-800'
  },
  appNameWrapper: {
    height: 200
  },
  appLabelWrapper: {
    height: 57
  },
  text: {
    color: 'color-primary-default'
  }
})
