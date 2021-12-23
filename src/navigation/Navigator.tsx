/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { store } from '../store';
import OnboardingView from '../views/OnboardingView';
import SignInView from '../views/SignInView';
import SignUpView from '../views/SignUpView';
import TabNavigator from './TabNavigator';
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

interface Props {
  initialRouteName: keyof StackParamList;
}

const Navigator = (props: Props) => {
  const { initialRouteName } = props;
  const { state, dispatch } = useContext(store);
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator headerMode="screen" initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
