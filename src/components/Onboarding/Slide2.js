/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

const Slide2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>FirstSlide</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
  },
});

export default Slide2;
