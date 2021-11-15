import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { NavigationProps } from '../../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeView = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Home page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeView;
