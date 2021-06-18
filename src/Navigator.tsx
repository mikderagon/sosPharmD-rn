/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Calendar from './components/Home/Calendar';
import Onboarding from './components/Onboarding/OnboardingView';
import SignIn from './components/SignIn/SignInView';
import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

const defaultTheme = {
  dark: false,
  colors: {
    primary: '#fff',
    background: '#fff',
    card: '#fff',
    text: '#fff',
    border: '#fff',
    notification: '#fff',
  },
};

const routes = {
  onboarding: 'Onboarding',
  signin: 'SignIn',
};

const Navigator = () => {
  const initialRouteName = routes.onboarding;
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Calendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
