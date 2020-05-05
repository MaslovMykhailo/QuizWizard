import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, Button} from '@ui-kitten/components'
import {AsyncStorage} from 'react-native'

export const Dummy: FC = () => {
  const [t, i18n] = useTranslation()

  const onPressUa = () => {
    i18n.changeLanguage('ua')
    AsyncStorage.setItem('lng', 'ua')
  }
  const onPressRu = () => {
    i18n.changeLanguage('ru')
    AsyncStorage.setItem('lng', 'ru')
  }
  const onPressEn = () => {
    i18n.changeLanguage('en')
    AsyncStorage.setItem('lng', 'en')
  }

  return (
    <>
      <Text>{t<string>('TEST_KEY')}</Text>
      <Button onPress={onPressUa} children="ua" />
      <Button onPress={onPressEn} children="en" />
      <Button onPress={onPressRu} children="ru" />
    </>
  )
}
