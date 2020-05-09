import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, Button, Card, Layout, Icon} from '@ui-kitten/components'
import {
  useLanguage,
  useTheme,
  useUserPreferences,
  useUserLogout
} from '@providers'
import {observer} from 'mobx-react-lite'

export const Dummy: FC = observer(() => {
  const [t] = useTranslation()
  const [, setLanguage] = useLanguage()

  const onPressUa = () => {
    setLanguage('ua')
  }
  const onPressRu = () => {
    setLanguage('ru')
  }
  const onPressEn = () => {
    setLanguage('en')
  }

  const [, toggleTheme] = useTheme()
  const userPreferences = useUserPreferences()

  const logout = useUserLogout()

  return (
    <Layout>
      <Card>
        <Text>{t<string>('TEST_KEY')}</Text>
        <Button onPress={onPressUa} children="ua" />
        <Button onPress={onPressEn} children="en" />
        <Button onPress={onPressRu} children="ru" />
        <Button onPress={toggleTheme} children={userPreferences.store.theme} />
        {/* <Button onPress={login} children="login" /> */}
        <Button
          onPress={logout}
          accessoryLeft={(props) => <Icon {...props} name="home" />}
          children="logout"
        />
      </Card>
    </Layout>
  )
})
