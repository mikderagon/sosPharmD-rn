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

const AddButton = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddButton;
