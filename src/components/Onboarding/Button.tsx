/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  text: string;
  onPress: () => void;
  style?: string;
}

const Button = (props: Props) => {
  const { text, onPress, style } = props;
  const getButtonStyle = () => {
    switch (style) {
      case 'borderless':
        return styles.borderless;
      case 'bold':
        return styles.bold;
      default:
        return styles.container;
    }
  };
  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(5),
    width: wp(30),
    backgroundColor: '#fff',
    borderColor: '#494949',
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderless: {
    height: hp(5),
    width: wp(30),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    height: hp(5),
    width: wp(30),
    backgroundColor: '#fff',
    borderColor: colors.main,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Button;
