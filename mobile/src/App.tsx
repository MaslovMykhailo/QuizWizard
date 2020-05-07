import React, {FC} from 'react'
import {I18nextProvider} from 'react-i18next'
import {observer} from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactNative'
import {IconRegistry, ApplicationProvider, Layout} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping} from '@eva-design/eva'
import {
  UserPreferencesProvider,
  userPreferencesValue,
  useTheme
} from '@providers'
import {i18next} from '@localization'
import {Dummy} from '@components'

export const App: FC = () => (
  <UserPreferencesProvider value={userPreferencesValue}>
    <IconRegistry icons={EvaIconsPack} />
    <ThemedApp>
      <LocalizedApp>
        <Dummy />
      </LocalizedApp>
    </ThemedApp>
  </UserPreferencesProvider>
)

const ThemedApp: FC = observer(({children}) => {
  const [theme] = useTheme()

  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Layout children={children} />
    </ApplicationProvider>
  )
})

const LocalizedApp: FC = ({children}) => {
  return <I18nextProvider i18n={i18next} children={children} />
}
