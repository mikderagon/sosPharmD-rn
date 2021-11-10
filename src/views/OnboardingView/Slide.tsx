/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import propTypes from 'prop-types';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  title: string;
  text: string;
  image: Image;
}

interface Navigation {}

const Slide = (props: Props | Navigation) => {
  const { title, text, image } = props;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.onboardingImageSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(40),
    width: wp(100),
    backgroundColor: '#fff',
  },
  onboardingImageSize: {
    height: hp(40),
    resizeMode: 'contain',
  },
});

export default Slide;
