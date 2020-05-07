import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import {resources} from './resources'
import {getDeviceLanguage} from './device-locale'

i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  resources,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true,
    useSuspense: false
  }
})

export const i18next = i18n
export type I18n = typeof i18n
export {Language} from './resources'
export {getDeviceLanguage} from './device-locale'
