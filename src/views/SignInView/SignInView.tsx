/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  memo,
  useRef,
} from 'react';
import {
  Alert,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import * as firestore from '../../server/firestore';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinnerActive, setSpinnerActive] = useState(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  // (DEV ENV ONLY) autologin
  // const [iter, setIter] = useState(0);
  // if (auth().currentUser && iter === 0) {
  //   setIter(iter + 1);
  //   handleSignIn(auth().currentUser.email, 'sospharmd');
  // }

  function handleSignIn(_email?: string, _password?: string) {
    firestore
      .signIn(_email || email, _password || password)
      .then((user: Locum | Owner) => {
        dispatch({
          type: 'SET_CURRENT_USER',
          currentUser: user,
        });
        if (user.accountType === 'locum') {
          firestore.initLocumData(user as Locum, dispatch);
        } else {
          firestore.initOwnerData(user as Owner, dispatch);
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      })
      .catch(e => {
        setSpinnerActive(false);
        Alert.alert('No user');
      });
  }

  return (
    <View style={styles.container}>
      {/* title */}
      <View
        style={{
          marginTop: hp(10),
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
      <View style={{ marginTop: hp(6) }}>
        <View style={styles.inputContainer}>
          <Image source={usernameImage} style={styles.usernameImage} />
          <TextInput
            ref={inputRef1}
            autoFocus
            style={styles.input}
            onChangeText={setEmail}
            placeholder={
              state.language === 'fr' ? 'Addresse courrielle' : 'Email'
            }
            placeholderTextColor="#bbb"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onEndEditing={() => inputRef2.current.focus()}
            // maxLength={20}
          />
        </View>
      </View>
      {/* password */}
      <View style={{ marginTop: hp(4) }}>
        <View style={styles.inputContainer}>
          <Image source={passwordImage} style={styles.usernameImage} />
          <TextInput
            ref={inputRef2}
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
            placeholder={state.language === 'fr' ? 'Mot de passe' : 'Password'}
            placeholderTextColor="#bbb"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            // maxLength={20}
          />
        </View>
      </View>
      {/* login */}
      <View style={{ marginTop: hp(4) }}>
        <LoginButton
          loading={spinnerActive}
          onPress={() => {
            // login logic TODO: persist user connection, and refactor in store.tsx
            setSpinnerActive(true);
            handleSignIn();
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
  usernameImage: {
    right: wp(1.2),
    resizeMode: 'contain',
    height: '100%',
  },
  input: {
    fontSize: 19,
    color: '#494949',
    width: '70%',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: wp(80),
    height: wp(80) * 0.15,
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignInView;
