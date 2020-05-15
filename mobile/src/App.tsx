import React, {FC} from 'react'
import {I18nextProvider} from 'react-i18next'
import {observer} from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactNative'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {IconRegistry, ApplicationProvider} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping} from '@eva-design/eva'
import {useAuth, useAppTheme, useUserPreferencesStatus} from '@providers'
import {i18next} from '@localization'
import {
  InitializationScreen,
  LoginScreen,
  OptionsScreen,
  HomeScreen
} from '@screens'
import {NavigationBar} from '@components'

const Tab = createBottomTabNavigator()

export const App: FC = observer(() => {
  const theme = useAppTheme()
  const [isAuth, isAuthProcessing] = useAuth()
  const [isPreferencesInitializing] = useUserPreferencesStatus()

  return (
    <I18nextProvider i18n={i18next}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer>
          <Tab.Navigator tabBar={NavigationBar}>
            {isPreferencesInitializing || isAuthProcessing ? (
              <Tab.Screen
                name="Initialization"
                options={{tabBarVisible: false}}
                component={InitializationScreen}
              />
            ) : isAuth ? (
              <>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Options" component={OptionsScreen} />
              </>
            ) : (
              <Tab.Screen
                name="Login"
                options={{tabBarVisible: false}}
                component={LoginScreen}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </I18nextProvider>
  )
})
