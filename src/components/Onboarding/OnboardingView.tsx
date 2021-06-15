/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { Animated, FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Slide from './Slide';

const OnboardingImage1 = require('../../assets/images/onboarding1.png');
const OnboardingImage2 = require('../../assets/images/onboarding2.png');
const OnboardingImage3 = require('../../assets/images/onboarding3.png');

interface Props {

}

const OnboardingView = ({ navigation }: NavigationProps) => {
  const pages = [
    {
      component: <Slide title="First Slide hey" text="Hello world" image={OnboardingImage1} />,
    },
    {
      component: <Slide title="First Slide hey" text="Hello world" image={OnboardingImage2} />,
    },
    {
      component: <Slide title="First Slide hey" text="Hello world" image={OnboardingImage3} />,
    },
  ];

  const renderItem = ({ item }: any) => {
    return item.component;
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <Animated.View style={styles.container}>
      <FlatList
        data={pages}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // onViewableItemsChanged={onPageSwiped}
        initialNumToRender={1}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
