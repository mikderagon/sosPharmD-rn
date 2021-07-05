/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import AccountConfirmation from './components/AccountConfirmation/AccountConfirmation';
import Calendar from './components/Calendar/CalendarView';
import Locums from './components/Locums/LocumsView';
import Home from './components/Home/HomeView';
import Settings from './components/Settings/SettingsView';
import Menu from './components/Menu/MenuView';
import Onboarding from './components/Onboarding/OnboardingView';
import SignIn from './components/SignIn/SignInView';
import SignUp from './components/SignUp/SignUpView';
import { StackParamList } from './types';
import { store } from './store';

const backCaret = require('./assets/images/backCaret.png');

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

const Navigator = () => {
  const { state } = useContext(store);
  // const initialRouteName = 'Onboarding';
  const initialRouteName = 'Home';
  // const initialRouteName = 'SignUp';
  // const initialRouteName = 'SignIn';
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator headerMode="screen" initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            title:
              state.language === 'french'
                ? 'Enregistrement de locum'
                : 'Locum Registration',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomColor: '#303D5C',
              borderBottomWidth: 1,
            },
            headerTitleStyle: {
              fontWeight: '800',
              color: '#303D5C',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Image source={backCaret} style={styles.backCaret} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AccountConfirmation"
          component={AccountConfirmation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Locums"
          component={Locums}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backCaret: {
    marginLeft: 10,
    height: 15,
    resizeMode: 'contain',
  },
});

export default Navigator;
