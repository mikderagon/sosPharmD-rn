/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Easing } from 'react-native';
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

const logo = require('../../assets/images/logo.png');
const backgroundSrc = require('../../assets/images/signInBackground.png');
const usernameImage = require('../../assets/images/usernameImage.png');
const passwordImage = require('../../assets/images/passwordImage.png');

const SignInView = ({ navigation }: NavigationProps) => {
  const animatedValue = new Animated.Value(0);
  const [username, setUsername] = useState('');
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
        <Text style={styles.appTitle}>Login</Text>
        <Animated.View
          style={[
            styles.customUnderline,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [-200, 0, 400],
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
      {/* username */}
      <View style={{ marginTop: hp(8) }}>
        <Input
          autoFocus
          set={setUsername}
          sourceImage={usernameImage}
          placeholder="Username/Email"
        />
      </View>
      {/* password */}
      <View style={{ marginTop: hp(4) }}>
        <Input
          set={setPassword}
          sourceImage={passwordImage}
          placeholder="Password"
          secured
        />
      </View>
      {/* login */}
      <View style={{ marginTop: hp(4) }}>
        <LoginButton
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
        />
      </View>
      <View style={{ marginTop: hp(5) }}>
        <Text style={styles.or}>or connect using one of these</Text>
      </View>
      {/* facebook */}
      <View style={{ marginTop: hp(3) }}>
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
            Forgot Password?
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
          <Text style={styles.regularText}>Don't have an account?</Text>
          <Text style={[styles.boldText, { color: colors.regularBlue }]}>
            {' '}
            Sign Up
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
