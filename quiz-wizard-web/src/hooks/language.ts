import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {changeLanguage, selectLanguage, useDispatch} from 'quiz-wizard-redux'

import {isLanguage} from '../helpers'

export const useLanguageChange = () => {
  const {i18n} = useTranslation()
  const dispatch = useDispatch()
  const language = useSelector(selectLanguage)

  const onLanguageChange = useCallback(
    ({target: {value}}: {target: {value: unknown}}) => {
      if (!isLanguage(value) || value === language) {
        return
      }

      i18n.changeLanguage(value)
      dispatch(changeLanguage(value))
    },
    [language, i18n, dispatch]
  )

  return {language, onLanguageChange}
}
