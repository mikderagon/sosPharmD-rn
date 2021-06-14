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
import Slide1 from './Slide';
import Slide2 from './Slide';
import Slide3 from './Slide';

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
        // controlStatusBar={false}
        pages={[
          {
            image: <Slide1 />,
            backgroundColor: 'transparent',
            title: 'Slide1',
            subtitle: 'Sub1',
          },
          {
            image: <Slide2 />,
            backgroundColor: 'transparent',
            title: 'Slide2',
            subtitle: 'Sub2',
          },
          {
            image: <Slide3 />,
            backgroundColor: 'transparent',
            title: 'Slide3',
            subtitle: 'Sub3',
          },
        ]}
        // bottomBarColor="t"
        // bottomBarHighlight={false}s
        // bottomBarHeight={hp(0)}
        showNext={false}
        showSkip={false}
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
