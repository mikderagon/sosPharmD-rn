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
import AccountConfirmation from '../../oldComponents/AccountConfirmation/AccountConfirmation';
import Calendar from '../../oldComponents/Calendar/CalendarView';
import LocumHome from '../../oldComponents/Home/Locum/LocumHomeView';
import OwnerHome from '../../oldComponents/Home/Owner/OwnerHomeView';
import Locums from '../../oldComponents/Locums/LocumsView';
import Onboarding from '../../views/OnboardingView/OnboardingView';
import Settings from '../../oldComponents/Settings/SettingsView';
import SignIn from '../../views/SignInView/SignInView';
import SignUp from '../../views/SignUp/SignUpView';
import { store } from '../../store';
import { StackParamList } from '../../types';

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
        <Stack.Screen
          name="AccountConfirmation"
          component={AccountConfirmation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={
            state.currentUser.accountType === 'locum' ? LocumHome : OwnerHome
          }
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
