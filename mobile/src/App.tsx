import React, {FC, useEffect} from 'react'
import {I18nextProvider} from 'react-i18next'
import {IconRegistry, ApplicationProvider} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light} from '@eva-design/eva'
import {i18next} from '@localization'
import {Dummy} from '@components'
import {AsyncStorage} from 'react-native'

export const App: FC = () => {
  useEffect(() => {
    AsyncStorage.getItem('lng').then((lng) => {
      if (lng) {
        i18next.changeLanguage(lng)
      }
    })
  })

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={light}>
        <I18nextProvider i18n={i18next}>
          <Dummy />
        </I18nextProvider>
      </ApplicationProvider>
    </>
  )
}
