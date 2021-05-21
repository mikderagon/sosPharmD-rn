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

const Locum = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>Locum</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Locum;
