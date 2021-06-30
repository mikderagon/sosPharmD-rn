/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import SidePanel from './SidePanel';

const MenuView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Menu</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
});

export default MenuView;
