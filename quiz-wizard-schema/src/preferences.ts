export type ThemeType = 'light' | 'dark'

export type Language = 'en' | 'ua' | 'ru'

export interface PreferencesSchema {
  theme: ThemeType
  language: Language
}
