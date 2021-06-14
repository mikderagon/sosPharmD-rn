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

const OnboardingImage1 = require('../../assets/images/onboarding1.png');

const Slide = ({ navigation, props }) => {
  const { Title, Text } = props;
  return (
    <View style={styles.container}>
      <Image source={OnboardingImage1} style={styles.onboardingImageSize} />
      <Text>{Title}</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      />
    </View>
  );
};

Slide.propTypes = {
  Title: propTypes.string,
  Text: propTypes.string,
};

Slide.defaultProps = {
  Title: 'Title',
  Text: 'Longer Text goes here',
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: wp(100),
    backgroundColor: '#fff',
  },
  onboardingImageSize: {
    height: hp(40),
    resizeMode: 'contain',
  },
});

export default Slide;
