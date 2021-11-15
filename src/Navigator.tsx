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
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import OnboardingView from './views/OnboardingView';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import { store } from './store';
import { StackParamList } from './types';
import HomeView from './views/HomeView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const backCaret = require('assets/images/backCaret.png');

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
          component={() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  // let iconName;

                  // if (route.name === 'Home') {
                  //   iconName = focused
                  //     ? 'ios-information-circle'
                  //     : 'ios-information-circle-outline';
                  // } else if (route.name === 'Settings') {
                  //   iconName = focused ? 'ios-list-box' : 'ios-list';
                  // }

                  // You can return any component that you like here!
                  return <Text>Bar button</Text>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
              initialRouteName="Home">
              <Tab.Screen
                name="Settings"
                component={() => <Text>Settings</Text>}
              />
              <Tab.Screen
                name="Profile"
                component={() => <Text>Profile</Text>}
              />
              <Tab.Screen name="Home" component={HomeView} />
              <Tab.Screen
                name="Calendars"
                component={() => <Text>Calendars</Text>}
              />
              <Tab.Screen
                name="Calendar"
                component={() => <Text>Calendar</Text>}
              />
            </Tab.Navigator>
          )}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
