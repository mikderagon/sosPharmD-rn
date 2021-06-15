/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../utils/responsiveLayout';

const logo = require('../assets/images/logo.png');

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>SOS Pharm D</Text>
      <Image source={logo} style={styles.logo} />
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
    marginTop: hp(6),
  },
  logo: {
    height: hp(20),
    resizeMode: 'contain',
  },
});

export default SignIn;
