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

type Screen = 'home' | 'camera';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');

  const navigateToHome = useCallback(() => setScreen('home'), []);
  const navigateToCamera = useCallback(() => setScreen('camera'), []);

  switch (screen) {
    case 'camera': 
      return <Camera navigateToHome={navigateToHome} />;
    case 'home':
      return <Home navigateToCamera={navigateToCamera} />;    
  }
}

export default App;
