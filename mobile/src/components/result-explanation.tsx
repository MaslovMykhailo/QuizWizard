import React, {FC} from 'react'
import {View, ViewProps} from 'react-native'
import {useTranslation} from 'react-i18next'
import {StyleService, useStyleSheet, Text} from '@ui-kitten/components'

export const ResultExplanation: FC<ViewProps> = ({style, ...props}) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <View {...props} style={[styles.root, style]}>
      <View style={styles.wrapper}>
        <View style={[styles.marker, styles.markerCorrect]} />
        <Text
          status="success"
          children={t<string>('CORRECT_MARK_EXPLANATION')}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={[styles.marker, styles.markerMissed]} />
        <Text
          status="warning"
          children={t<string>('MISSED_MARK_EXPLANATION')}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={[styles.marker, styles.markerIncorrect]} />
        <Text
          status="danger"
          children={t<string>('INCORRECT_MARK_EXPLANATION')}
        />
      </View>
    </View>
  )
}

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6
  },
  markerCorrect: {
    backgroundColor: 'text-success-color'
  },
  markerMissed: {
    backgroundColor: 'text-warning-color'
  },
  markerIncorrect: {
    backgroundColor: 'text-danger-color'
  }
})
