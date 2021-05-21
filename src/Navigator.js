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
import SignIn from './components/SignIn';

const Stack = createStackNavigator();

const Navigator = ({ children }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Calendar} />
        <Stack.Screen name="Welcome" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
