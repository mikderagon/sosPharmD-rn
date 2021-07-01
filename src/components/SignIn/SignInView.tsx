/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Easing } from 'react-native';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import 'react-native-gesture-handler';
import { sharedStyles } from '../../styles/shared';
import colors from '../../styles/colors';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import LoginButton from './Button';
import Input from './Input';
import { useContext } from 'react';
import { store } from '../../store';

const logo = require('../../assets/images/logo.png');
const backgroundSrc = require('../../assets/images/signInBackground.png');
const usernameImage = require('../../assets/images/usernameImage.png');
const passwordImage = require('../../assets/images/passwordImage.png');

const SignInView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);
  const { users } = state;

  const animatedValue = new Animated.Value(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }),
        Animated.delay(1000),
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  return (
    <View style={styles.container}>
      {/* title */}
      <View
        style={{
          marginTop: hp(16),
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          marginLeft: wp(11),
        }}>
        <Text style={styles.appTitle}>
          {state.language === 'french' ? 'Connexion' : 'Login'}
        </Text>
        <Animated.View
          style={[
            styles.customUnderline,
            {
              width: state.language === 'french' ? wp(50) : wp(40),
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [-300, 0, 400],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      {/* logo */}
      {/* <View style={{ marginTop: hp(1) }}>
        <Image source={logo} style={styles.logo} />
      </View> */}
      {/* identifier */}
      <View style={{ marginTop: hp(8) }}>
        <Input
          autoFocus
          set={setEmail}
          sourceImage={usernameImage}
          placeholder={
            state.language === 'french' ? 'Addresse courrielle' : 'Email'
          }
        />
      </View>
      {/* password */}
      <View style={{ marginTop: hp(4) }}>
        <Input
          set={setPassword}
          sourceImage={passwordImage}
          placeholder={
            state.language === 'french' ? 'Mot de passe' : 'Password'
          }
          secured
        />
      </View>
      {/* login */}
      <View style={{ marginTop: hp(4) }}>
        <LoginButton
          onPress={() => {
            // login logic TODO: persist user connection, and refactor in store.tsx
            const validUser = users.find(
              user => user.email === email && user.password === password,
            );
            if (validUser) {
              dispatch({
                type: 'SET_CURRENT_USER',
                currentUser: validUser,
              });
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } else {
              Alert.alert('No user');
            }
          }}
          text={state.language === 'french' ? 'Se connecter' : 'Log in'}
        />
      </View>
      <View style={{ marginTop: hp(5) }}>
        <Text style={styles.or}>
          {state.language === 'french'
            ? 'ou connectez-vous avec'
            : 'or connect using one of these'}
        </Text>
      </View>
      {/* facebook */}
      <View style={{ marginTop: hp(2) }}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/facebookButton.png')} />
        </TouchableOpacity>
      </View>
      {/* apple */}
      <View style={{ marginTop: hp(3) }}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/signWithApple.png')} />
        </TouchableOpacity>
      </View>
      {/* forgot password */}
      <View style={{ marginTop: hp(5) }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('forgotPassword');
          }}>
          <Text style={[styles.boldText, { color: colors.regularBlue }]}>
            {state.language === 'french'
              ? 'Mot de passe oublié?'
              : 'Forgot Password?'}
          </Text>
        </TouchableOpacity>
      </View>
      {/*  */}
      <View style={{ marginTop: hp(4) }}>
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.regularText}>
            {state.language === 'french'
              ? 'Pas de compte?'
              : "Don't have an account?"}
          </Text>
          <Text style={[styles.boldText, { color: colors.regularBlue }]}>
            {' '}
            {state.language === 'french' ? 'Enregistrez-vous' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.darkerBlue,
  },
  or: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.darkerBlue,
  },
  customUnderline: {
    marginTop: 3,
    height: 2,
    width: wp(40),
    backgroundColor: colors.darkerBlue,
  },
  logo: {
    height: hp(20),
    resizeMode: 'contain',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '500',
    fontSize: 15,
  },
  regularText: {
    fontWeight: '300',
    fontSize: 14,
  },
});

export default SignInView;
