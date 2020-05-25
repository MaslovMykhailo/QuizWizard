import React, {FC} from 'react'
import {I18nextProvider} from 'react-i18next'
import {observer} from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactNative'
import 'react-native-gesture-handler'
import {enableScreens} from 'react-native-screens'
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
  HomeScreen,
  QuizzesScreen,
  AnswersScreen,
  QuizSelectionScreen,
  AnswersDetectionScreen
} from '@screens'
import {NavigationBar} from '@components'
import {AppRoute} from '@constants'

enableScreens()

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
                name={AppRoute.Initialization}
                options={{tabBarVisible: false}}
                component={InitializationScreen}
              />
            ) : isAuth ? (
              <>
                <Tab.Screen name={AppRoute.Home} component={HomeScreen} />
                <Tab.Screen name={AppRoute.Quizzes} component={QuizzesScreen} />
                <Tab.Screen name={AppRoute.Answers} component={AnswersScreen} />
                <Tab.Screen name={AppRoute.Options} component={OptionsScreen} />
                <Tab.Screen
                  name={AppRoute.QuizSelection}
                  options={{tabBarVisible: false}}
                  component={QuizSelectionScreen}
                />
                <Tab.Screen
                  name={AppRoute.AnswersDetection}
                  options={{tabBarVisible: false}}
                  component={AnswersDetectionScreen}
                />
              </>
            ) : (
              <Tab.Screen
                name={AppRoute.Login}
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
