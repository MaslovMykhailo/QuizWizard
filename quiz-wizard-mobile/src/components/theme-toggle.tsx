import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {View, ViewProps} from 'react-native'
import {useTheme} from '@providers'
import {
  Toggle,
  Text,
  StyleService,
  useStyleSheet,
  Button
} from '@ui-kitten/components'
import {MoonIcon, SunIcon} from '@icons'

export const ThemeToggle: FC<ViewProps> = observer((props) => {
  const [t] = useTranslation()
  const style = useStyleSheet(themedStyles)

  const [theme, toggleTheme, setTheme] = useTheme()
  const setDarkTheme = useCallback(
    () => requestAnimationFrame(() => setTheme('dark')),
    [setTheme]
  )
  const setLightTheme = useCallback(
    () => requestAnimationFrame(() => setTheme('light')),
    [setTheme]
  )

  return (
    <View {...props} style={[style.root, props.style]}>
      <Button
        onPress={setDarkTheme}
        appearance="ghost"
        accessoryLeft={MoonIcon}
      />
      <Text children={t<string>('THEME_DARK')} />
      <Toggle checked={theme === 'light'} onChange={toggleTheme} />
      <Text children={t<string>('THEME_LIGHT')} />
      <Button
        appearance="ghost"
        onPress={setLightTheme}
        accessoryLeft={SunIcon}
      />
    </View>
  )
})

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12
  }
})
