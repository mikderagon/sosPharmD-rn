/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text>Footer goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: hp(10),
    width: wp(100),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
