import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import ICU from 'i18next-icu'

import enTranslation from './translations/translation.en.json'

const fallbackLng = 'en'
const fallbackTranslation = enTranslation

export const i18n = i18next
  .use(ICU)
  .use(initReactI18next)

export const initLocalization = (lng: string, debug = false) =>
  import(
    /* webpackChunkName: "translation" */
    `./translations/translation.${lng}.json`
  )
    .then(({default: translation}) => translation)
    .then((translation) => i18n
      .init({
        lng,
        fallbackLng,
        resources: {
          [fallbackLng]: {
            translation: fallbackTranslation
          },
          [lng]: {
            translation
          }
        },
        interpolation: {
          escapeValue: false
        },
        debug
      }))

export {useTranslation} from 'react-i18next'
