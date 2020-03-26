/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, { useState, useCallback } from 'react';
import Home from './src/Home';
import Camera from './src/Camera';
import BlurRecognitionCamera from './src/BlurRecognitionCamera';

type Screen = 'home' | 'camera' | 'blur-recognition-camera';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');

  const navigateToHome = useCallback(() => setScreen('home'), []);
  const navigateToCamera = useCallback(() => setScreen('camera'), []);
  const navigateToBlurRecognitionCamera = useCallback(() => setScreen('blur-recognition-camera'), []);

  switch (screen) {
    case 'camera': 
      return <Camera navigateToHome={navigateToHome} />;
    case 'blur-recognition-camera': 
      return <BlurRecognitionCamera navigateToHome={navigateToHome} />
    case 'home':
      return (
        <Home 
          navigateToCamera={navigateToCamera} 
          navigateToBlurRecognitionCamera={navigateToBlurRecognitionCamera}
        />);    
  }
}

export default App;
