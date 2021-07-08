/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
  const { onPress, text = 'Log in', active = false } = props;
  return active ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={1} style={styles.inactiveContainer}>
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
  inactiveContainer: {
    height: hp(6),
    width: wp(80),
    borderRadius: 50,
    backgroundColor: '#ddd',
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
