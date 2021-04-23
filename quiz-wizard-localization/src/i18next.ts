import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import ICU from 'i18next-icu'

import enTranslation from './translations/translation.en.json'
import uaTranslation from './translations/translation.ua.json'
import ruTranslation from './translations/translation.ru.json'

export const i18n = i18next
  .use(ICU)
  .use(initReactI18next)

export const initLocalization = (
  lng: string,
  debug = false
) => i18n.init({
  lng,
  resources: {
    en: {translation: enTranslation},
    ua: {translation: uaTranslation},
    ru: {translation: ruTranslation}
  },
  interpolation: {
    escapeValue: false
  },
  debug
})

export {useTranslation} from 'react-i18next'
