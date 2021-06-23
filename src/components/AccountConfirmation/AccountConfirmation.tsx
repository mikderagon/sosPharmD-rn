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

const spinner = require('../../assets/animations/spinner.json');
const backgroundSrc = require('../../assets/images/signInBackground.png');

const AccountConfirmation = ({ navigation }: NavigationProps) => {
  return (
    <ImageBackground
      source={backgroundSrc}
      style={sharedStyles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.mainDiv}>
          <Text style={styles.title}>Awaiting email confirmation</Text>
          <View style={{ marginTop: hp(5) }}>
            <LottieView
              source={spinner}
              speed={1}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDiv: {
    height: hp(44),
    width: wp(90),
    borderRadius: wp(5),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#1D2366',
    fontWeight: '600',
    textAlign: 'center',
  },
  lottie: {
    height: hp(15),
  },
});

export default AccountConfirmation;
