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
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import OnboardingView from './views/OnboardingView';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import { store } from './store';
import { StackParamList } from './types';

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
          options={({ navigation }) => ({
            title: state.language === 'fr' ? 'Inscription' : 'Registration',
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
