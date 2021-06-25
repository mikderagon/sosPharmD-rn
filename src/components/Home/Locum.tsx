/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  date: number;
}

const Locum = (props: Props) => {
  const { date } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(13),
    width: wp(85),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default Locum;
