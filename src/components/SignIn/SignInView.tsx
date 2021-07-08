/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState, useMemo, memo } from 'react';
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import * as firestore from '../../actions/firestore';
import { Locum, Owner } from '../../models';
import { store } from '../../store';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import AnimatedTrail from './AnimatedTrail';
import LoginButton from './Button';
import Input from './Input';

const usernameImage = require('assets/images/usernameImage.png');
const passwordImage = require('assets/images/passwordImage.png');

const SignInView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);

  function handleSignIn(email: string, password: string) {
    firestore
      .signIn(email, password)
      .then((user: Locum | Owner) => {
        dispatch({
          type: 'SET_CURRENT_USER',
          currentUser: user,
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      })
      .catch(e => {
        Alert.alert(e);
      });
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* title */}
      <View
        style={{
          marginTop: hp(13),
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          marginLeft: wp(11),
        }}>
        <Text style={styles.appTitle}>
          {state.language === 'fr' ? 'Connexion' : 'Login'}
        </Text>
        <AnimatedTrail language={state.language} />
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
            state.language === 'fr' ? 'Addresse courrielle' : 'Email'
          }
        />
      </View>
      {/* password */}
      <View style={{ marginTop: hp(4) }}>
        <Input
          set={setPassword}
          sourceImage={passwordImage}
          placeholder={state.language === 'fr' ? 'Mot de passe' : 'Password'}
          secured
        />
      </View>
      {/* login */}
      <View style={{ marginTop: hp(4) }}>
        <LoginButton
          onPress={() => {
            // login logic TODO: persist user connection, and refactor in store.tsx
            handleSignIn(email, password);
          }}
          text={state.language === 'fr' ? 'Se connecter' : 'Log in'}
        />
      </View>
      {/* forgot password */}
      <View style={{ marginTop: hp(3) }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('forgotPassword');
          }}>
          <Text style={[styles.boldText, { color: colors.main }]}>
            {state.language === 'fr'
              ? 'Mot de passe oublié?'
              : 'Forgot Password?'}
          </Text>
        </TouchableOpacity>
      </View>
      {/*  */}
      <View style={{ marginTop: hp(3) }}>
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.regularText}>
            {state.language === 'fr'
              ? 'Pas de compte?'
              : "Don't have an account?"}
          </Text>
          <Text style={[styles.boldText, { color: colors.main }]}>
            {' '}
            {state.language === 'fr' ? 'Inscrivez-vous' : 'Sign Up'}
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
