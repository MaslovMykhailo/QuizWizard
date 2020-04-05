import React, {useState, useCallback} from 'react'
import {Home, Camera, BlurRecognitionCamera} from '@components'

type Screen = 'home' | 'camera' | 'blur-recognition-camera'

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home')

  const navigateToHome = useCallback(() => setScreen('home'), [])
  const navigateToCamera = useCallback(() => setScreen('camera'), [])
  const navigateToBlurRecognitionCamera = useCallback(
    () => setScreen('blur-recognition-camera'),
    []
  )

  switch (screen) {
    case 'camera':
      return <Camera navigateToHome={navigateToHome} />
    case 'blur-recognition-camera':
      return <BlurRecognitionCamera navigateToHome={navigateToHome} />
    case 'home':
      return (
        <Home
          navigateToCamera={navigateToCamera}
          navigateToBlurRecognitionCamera={navigateToBlurRecognitionCamera}
        />
      )
  }
}
