/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  onPress: () => void;
  text?: string;
  active?: boolean;
}

const Button = (props: Props) => {
  const { onPress, text = 'Log in', active = true } = props;
  return (
    <TouchableOpacity
      activeOpacity={active ? 0.2 : 1}
      style={styles.container}
      onPress={() => {
        active ? onPress() : {};
      }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    width: wp(80),
    borderRadius: 50,
    backgroundColor: colors.darkerBlue,
    borderWidth: 1,
    borderColor: '#263C4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
  },
});

export default Button;
