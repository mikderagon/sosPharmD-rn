/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import SidePanel from './SidePanel';

const SettingsView = ({ navigation }) => {
  return (
    <SidePanel
      navigation={navigation}
      toggleSidePanel={() => {
        navigation.navigate('Home');
      }}
    />
  );
};

export default SettingsView;
