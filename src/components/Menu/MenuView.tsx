/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

const MenuView = ({ navigation }) => {
  function navigate(routeName: string) {
    navigation.closeDrawer();
    navigation.navigate(routeName);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.margins}>
          <TouchableOpacity
            onPress={() => {
              navigate('Calendar');
            }}
            style={styles.item}>
            <Text>Calendar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.margins}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigate('Calendar');
            }}>
            <Text>Locums</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    marginTop: 50,
  },
  item: {
    height: 80,
    width: 80,
    backgroundColor: '#ddd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  margins: {
    marginTop: 10,
  },
});

export default MenuView;
