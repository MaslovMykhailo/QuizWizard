import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import {resources} from './resources'

i18n.use(initReactI18next).init({
  lng: 'en',
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

export {Language} from './resources'
