import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import RootStack from './src/navigation/RootStack';

export default function App() {
  useEffect(() => {
    Orientation.lockToPortrait(); 
    return () => {
      Orientation.unlockAllOrientations(); 
    };
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
