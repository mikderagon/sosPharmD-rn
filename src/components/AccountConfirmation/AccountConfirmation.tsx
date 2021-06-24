/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import { sharedStyles } from '../../styles/shared';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const spinner = require('../../assets/animations/spinner.json');
const backgroundSrc = require('../../assets/images/signInBackground.png');

const AccountConfirmation = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.mainDiv, { marginTop: hp(10) }]}>
        <Text style={styles.title}>
          Sending confirmation email to activate your account
        </Text>
        <View style={{ marginTop: hp(5) }}>
          {/* <LottieView
            source={spinner}
            speed={1}
            autoPlay
            loop
            style={styles.lottie}
          /> */}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    // justifyContent: 'center',
    // opacity: 0.5,
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
  },
  mainDiv: {
    height: hp(44),
    width: wp(100),
    // borderBottomLeftRadius: wp(15),
    // borderBottomRightRadius: wp(15),
    borderRadius: wp(15),
    backgroundColor: '#303D5C',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  lottie: {
    height: hp(10),
  },
});

export default AccountConfirmation;
