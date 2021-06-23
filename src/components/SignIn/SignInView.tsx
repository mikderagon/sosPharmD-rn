/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { sharedStyles } from '../../styles/shared';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundSrc}
        style={sharedStyles.backgroundImage}>
        {/* title */}
        <View style={{ marginTop: hp(1) }}>
          <Text style={styles.appTitle}>SOS Pharm D</Text>
        </View>
        {/* logo */}
        <View style={{ marginTop: hp(0) }}>
          <Image source={logo} style={styles.logo} />
        </View>
        {/* username */}
        <View style={{ marginTop: hp(5) }}>
          <Input
            autoFocus
            value={username}
            set={setUsername}
            sourceImage={usernameImage}
            placeholder="Username/Email"
          />
        </View>
        {/* password */}
        <View style={{ marginTop: hp(4) }}>
          <Input
            value={password}
            set={setPassword}
            sourceImage={passwordImage}
            placeholder="Password"
            secured
          />
        </View>
        {/* login */}
        <View style={{ marginTop: hp(5) }}>
          <LoginButton
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }}
          />
        </View>
        {/* facebook */}
        <View style={{ marginTop: hp(6) }}>
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
        <View style={{ marginTop: hp(4) }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('forgotPassword');
            }}>
            <Text style={styles.boldText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        {/*  */}
        <View style={{ marginTop: hp(2.5) }}>
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.regularText}>Don't have an account?</Text>
            <Text style={styles.boldText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  appTitle: {
    fontSize: 30,
    marginTop: hp(6),
    fontWeight: '500',
    color: '#303D5C',
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
