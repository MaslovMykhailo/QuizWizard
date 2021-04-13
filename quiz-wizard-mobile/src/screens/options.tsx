import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {
  Card,
  Text,
  Divider,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'
import {ThemeToggle, LanguageSelect, LogoutButton, Screen} from '@components'

export const OptionsScreen: FC = () => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <Screen>
      <Card
        disabled
        status="primary"
        header={(props) => (
          <View {...props}>
            <Text category="h1" children={t<string>('OPTIONS_SCREEN_TITLE')} />
          </View>
        )}>
        <Text
          category="h5"
          children={t<string>('OPTIONS_SCREEN_SUBTITLE_THEME')}
        />
        <ThemeToggle />
        <Divider style={styles.divider} />
        <Text
          category="h5"
          children={t<string>('OPTIONS_SCREEN_SUBTITLE_LANGUAGE')}
        />
        <LanguageSelect />
      </Card>
      <View style={styles.logoutButtonWrapper}>
        <LogoutButton />
      </View>
    </Screen>
  )
}

const themedStyles = StyleService.create({
  divider: {
    marginBottom: 12
  },
  logoutButtonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
