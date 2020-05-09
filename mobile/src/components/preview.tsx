import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components'

export const Preview: FC = ({children}) => {
  const [t] = useTranslation()

  const styles = useStyleSheet(themedStyles)

  return (
    <Layout style={styles.root}>
      <Layout style={styles.appNameWrapper}>
        <Text
          category="h1"
          selectable={false}
          style={styles.appName}
          children={t<string>('APP_NAME')}
        />
      </Layout>
      {children}
    </Layout>
  )
}

const themedStyles = StyleService.create({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'color-basic-100'
  },
  appNameWrapper: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-basic-800'
  },
  appName: {
    color: 'color-primary-default'
  }
})
