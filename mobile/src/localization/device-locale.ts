import {Platform, NativeModules} from 'react-native'

import {languages, Language} from './resources'

export const getDeviceLocale = (): string =>
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier

export const getDeviceLanguage = (): Language => {
  const deviceLocale = getDeviceLocale()
  const language = languages.find((lng) => deviceLocale.startsWith(lng))
  return language ?? 'en'
}
