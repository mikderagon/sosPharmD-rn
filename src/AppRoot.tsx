/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext, useContext } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import Navigator from './Navigator';
import { StateProvider, store } from './store';

const AppRoot = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StateProvider>
      <Navigator />
    </StateProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default AppRoot;
