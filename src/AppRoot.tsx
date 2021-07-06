/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import Navigator from './Navigator';
import { StateProvider } from './store';

const AppRoot = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StateProvider>
      <StatusBar animated barStyle="dark-content" showHideTransition="fade" />
      <Navigator />
    </StateProvider>
  );
};

export default AppRoot;
