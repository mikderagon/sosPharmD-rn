/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import auth from '@react-native-firebase/auth';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import Navigator from './Navigator';
import { store } from './store';
import { StackParamList } from './types';

const AppRoot = () => {
  const { state, dispatch } = useContext(store);
  let initialRouteName = 'Onboarding';
  if (auth().currentUser) {
    // rehydrate app with user's data, then navigate to home

    // then
    initialRouteName = 'Home';
  }

  return (
    <>
      <Navigator initialRouteName={initialRouteName as keyof StackParamList} />
    </>
  );
};

export default AppRoot;
