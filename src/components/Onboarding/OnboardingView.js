/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const OnboardingView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text>OnboardingView</Text> */}
      {/* <Button
        title="Go back"
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      /> */}
      <Onboarding
        pages={[
          { image: <Slide1 /> },
          { image: <Slide2 /> },
          { image: <Slide3 /> },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  imagePlace: {
    marginTop: hp(20),
    alignSelf: 'center',
    height: 200,
    width: 300,
    backgroundColor: 'red',
  },
});

export default OnboardingView;
