import React, {FC, useCallback} from 'react'
import {observer} from 'mobx-react-lite'
import {useTranslation} from 'react-i18next'
import {
  RadioGroup,
  Radio,
  StyleService,
  useStyleSheet,
  RadioGroupProps
} from '@ui-kitten/components'
import {useLanguage} from '@providers'

export const LanguageSelect: FC<RadioGroupProps> = observer((props) => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  const [language, setLanguage, languages] = useLanguage()
  const onChange = useCallback(
    (index: number) => {
      const languageToChange = languages[index]
      if (language !== languageToChange) {
        setLanguage(languageToChange)
      }
    },
    [language, languages, setLanguage]
  )

  return (
    <RadioGroup
      {...props}
      style={[styles.root, props.style]}
      selectedIndex={languages.indexOf(language)}
      onChange={onChange}>
      {languages.map((lng) => (
        <Radio key={lng}>{t<string>(`LANGUAGE_${lng.toUpperCase()}`)}</Radio>
      ))}
    </RadioGroup>
  )
})

const themedStyles = StyleService.create({
  root: {
    paddingTop: 12,
    paddingBottom: 12
  }
})
