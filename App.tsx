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
import AppRoot from './src/AppRoot';
import Footer from './src/components/Footer';
import { StateProvider } from './src/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StateProvider>
      <StatusBar animated barStyle="dark-content" showHideTransition="fade" />
      <AppRoot />
      <Footer />
    </StateProvider>
  );
};

export default App;
