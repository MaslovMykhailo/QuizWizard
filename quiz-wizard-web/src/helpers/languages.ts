import {Language} from 'quiz-wizard-schema'

export const getLanguages = (): Language[] =>
  ['en', 'ua', 'ru']

export const isLanguage = (value: unknown): value is Language =>
  getLanguages().includes(value as Language)

export const getLanguageName = (language: Language) => {
  switch (language) {
    case 'en':
      return 'English'
    case 'ua':
      return 'Українська'
    case 'ru':
      return 'Русский'
  }
}
