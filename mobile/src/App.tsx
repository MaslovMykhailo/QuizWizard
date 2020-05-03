import React, {useState, useCallback} from 'react'
import {
  Home,
  BlurRecognitionCamera,
  CircleRecognitionCamera,
  AnswersDetector
} from '@components'

type Screen =
  | 'home'
  | 'camera'
  | 'blur-recognition-camera'
  | 'circle-recognition-camera'

export const App: React.FC = () => {
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
