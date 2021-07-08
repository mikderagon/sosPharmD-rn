/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { store } from '../../store';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import LoginButton from './Button';
import Input from './Input';

const usernameImage = require('assets/images/usernameImage.png');
const passwordImage = require('assets/images/passwordImage.png');

const SignInView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);

  function handleSignIn(email: string, password: string) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        const { _data } = await firestore()
          .collection('users')
          .doc(user.user.uid)
          .get();
        return {
          email: user.user.email,
          ..._data,
          emailVerified: user.user.emailVerified,
        };
      })
      .then(user => {
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
        console.log(e);
        Alert.alert('Aucun compte trouvé sous cet identifiant');
      });
  }

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
        Animated.delay(400),
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.exp,
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
          marginTop: hp(13),
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
            handleSignIn(email, password);
          }}
          text={state.language === 'french' ? 'Se connecter' : 'Log in'}
        />
      </View>
      {/* forgot password */}
      <View style={{ marginTop: hp(3) }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('forgotPassword');
          }}>
          <Text style={[styles.boldText, { color: colors.main }]}>
            {state.language === 'french'
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
            {state.language === 'french'
              ? 'Pas de compte?'
              : "Don't have an account?"}
          </Text>
          <Text style={[styles.boldText, { color: colors.main }]}>
            {' '}
            {state.language === 'french' ? 'Inscrivez-vous' : 'Sign Up'}
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
