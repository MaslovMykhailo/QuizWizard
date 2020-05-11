import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import {I18nextProvider} from 'react-i18next'
import {observer} from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactNative'
import 'react-native-gesture-handler'
import {
  IconRegistry,
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping} from '@eva-design/eva'
import {
  UserPreferencesProvider,
  userPreferencesValue,
  useTheme,
  useAuth,
  useUserPreferencesStatus
} from '@providers'
import {NavigationContainer} from '@react-navigation/native'
import {
  createBottomTabNavigator,
  BottomTabBarProps
} from '@react-navigation/bottom-tabs'
import {i18next} from '@localization'
import {InitializationScreen, LoginScreen} from '@screens'
import {Dummy, Preview} from '@components'

export const App: FC = () => (
  <UserPreferencesProvider value={userPreferencesValue}>
    <I18nextProvider i18n={i18next}>
      <IconRegistry icons={EvaIconsPack} />
      <Root>
        <Dummy />
      </Root>
    </I18nextProvider>
  </UserPreferencesProvider>
)

const Tab = createBottomTabNavigator()

const Root: FC = observer(() => {
  const [theme] = useTheme()
  const [isAuth, isAuthProcessing] = useAuth()
  const [isPreferencesInitializing] = useUserPreferencesStatus()

  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
          {isPreferencesInitializing || isAuthProcessing ? (
            <Tab.Screen
              name="Initialization"
              options={{tabBarVisible: false}}
              component={InitializationScreen}
            />
          ) : isAuth ? (
            <>
              <Tab.Screen name="Home" component={Dummy} />
              <Tab.Screen name="Home2" component={Preview} />
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
  )
})

const BottomTabBar: FC<BottomTabBarProps> = ({navigation, state}) => (
  <BottomNavigation
    style={styles.tabs}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="person-outline" />}
    />
    <BottomNavigationTab icon={(props) => <Icon {...props} name="home" />} />
  </BottomNavigation>
)

const styles = StyleSheet.create({
  tabs: {
    // height: 0
    // bottom: 0
  }
})
