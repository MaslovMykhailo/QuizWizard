import React, {FC} from 'react'
import {
  Layout,
  Spinner,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import {Preview} from '@components'

export const InitializationScreen: FC = () => {
  const styles = useStyleSheet(themedStyles)

  return (
    <Preview>
      <Layout style={styles.spinnerWrapper}>
        <Spinner size="large" />
      </Layout>
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
