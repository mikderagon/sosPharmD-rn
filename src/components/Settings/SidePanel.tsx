/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { Text } from 'react-native';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationProp } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
const backCaret = require('../../assets/images/backCaret.png');

interface Props {
  toggleSidePanel: () => void;
  navigation: NavigationProp;
}

const SidePanel = (props: Props) => {
  const { toggleSidePanel, navigation } = props;
  return (
    <View style={[styles.container]}>
      <>
        <View style={styles.innerView}>
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <TouchableOpacity
                onPress={toggleSidePanel}
                style={{ width: '35%' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={backCaret} style={styles.backCaret} />
                  <Text>Home</Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { width: '30%' }]}>
                Settings
              </Text>
              <View style={{ width: '35%' }} />
            </View>
          </View>

          <View style={styles.row}>
            <Text>Photo</Text>
          </View>
          <View style={styles.row}>
            <Text>Name</Text>
          </View>
          <View style={styles.row}>
            <Text>Favorite Softwares</Text>
          </View>
          <View style={styles.row}>
            <Text>Account type</Text>
          </View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            }}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

const panelDimensions = {
  height: hp(100),
  width: wp(100),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: panelDimensions.height,
    width: panelDimensions.width,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  innerView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ddd',
  },
  header: {
    height: hp(10),
    width: '100%',
    backgroundColor: 'yellow',
  },
  innerHeader: {
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backCaret: {
    tintColor: 'red',
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  row: {
    marginVertical: 1,
    height: hp(5),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default SidePanel;
