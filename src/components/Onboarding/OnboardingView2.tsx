/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Animated, FlatList, Image, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Slide from './Slide';

const OnboardingView = ({ navigation }) => {
  const pages = [
    {
      component: <Slide Title="First Slide hey" Text="Hello world" />,
    },
    {
      component: <Slide Title="First Slide hey" Text="Hello world" />,
    },
    {
      component: <Slide Title="First Slide hey" Text="Hello world" />,
    },
  ];

  const renderItem = ({ item }) => {
    return item.component;
  };

  const keyExtractor = (item, index) => index.toString();

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
