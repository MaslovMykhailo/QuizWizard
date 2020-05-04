import React, {useState, useCallback, FC, useEffect} from 'react'
import {
  Home,
  BlurRecognitionCamera,
  CircleRecognitionCamera,
  AnswersDetector
} from '@components'
import {View} from 'react-native'
import {LoginButton, AccessToken} from 'react-native-fbsdk'

type Screen =
  | 'home'
  | 'camera'
  | 'blur-recognition-camera'
  | 'circle-recognition-camera'

export const LegacyApp: FC = () => {
  const [screen, setScreen] = useState<Screen>('home')

  const navigateToHome = useCallback(() => setScreen('home'), [])
  const navigateToCamera = useCallback(() => setScreen('camera'), [])
  const navigateToBlurRecognitionCamera = useCallback(
    () => setScreen('blur-recognition-camera'),
    []
  )
  const navigateToCircleRecognitionCamera = useCallback(
    () => setScreen('circle-recognition-camera'),
    []
  )

  switch (screen) {
    case 'camera':
      return <AnswersDetector />
    case 'blur-recognition-camera':
      return <BlurRecognitionCamera navigateToHome={navigateToHome} />
    case 'circle-recognition-camera':
      return <CircleRecognitionCamera />
    case 'home':
      return (
        <Home
          navigateToCamera={navigateToCamera}
          navigateToBlurRecognitionCamera={navigateToBlurRecognitionCamera}
          navigateToCircleRecognitionCamera={navigateToCircleRecognitionCamera}
        />
      )
  }
}

export {ImageProcessor} from '@components'

export const App: FC = () => {
  useEffect(() => {
    AccessToken.getCurrentAccessToken().then((data) => {
      console.log(data?.accessToken.toString())
    })
  }, [])

  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error)
          } else if (result.isCancelled) {
            console.log('login is cancelled.')
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data?.accessToken.toString())
            })
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  )
}
