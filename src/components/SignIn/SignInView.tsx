/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Input from './Input';
import LoginButton from './Button';
import { NavigationProps } from '../../types';

const logo = require('../../assets/images/logo.png');
const backgroundSrc = require('../../assets/images/signInBackground.png');
const usernameImage = require('../../assets/images/usernameImage.png');
const passwordImage = require('../../assets/images/passwordImage.png');

const SignInView = ({ navigation }: NavigationProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundSrc} style={styles.backgroundImage}>
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
              navigation.navigate('Home');
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

        <View style={{ marginTop: hp(2) }}>
          <Text
            style={styles.bold}
            onPress={() => {
              navigation.navigate('forgotPassword');
            }}>
            Forgot Password?
          </Text>
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
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
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
  bold: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default SignInView;
