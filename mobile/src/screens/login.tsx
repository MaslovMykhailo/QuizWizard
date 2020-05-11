import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  StyleService,
  useStyleSheet,
  Button,
  Text
} from '@ui-kitten/components'
import {useUserLogin} from '@providers'
import {Preview} from '@components'
import {FacebookIcon} from '@icons'

export const LoginScreen: FC = () => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const login = useUserLogin()

  return (
    <Preview>
      <Layout style={styles.spinnerWrapper}>
        <Button
          size="medium"
          onPress={login}
          accessoryLeft={(props) => <FacebookIcon {...props} />}>
          {(props) => (
            <Text
              {...props}
              category="p1"
              children={t<string>('LOGIN_BUTTON_TEXT')}
            />
          )}
        </Button>
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
