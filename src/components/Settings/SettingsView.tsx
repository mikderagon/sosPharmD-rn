/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { Alert, Text } from 'react-native';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { NavigationProp } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

const backCaret = require('../../assets/images/backCaret.png');

const SettingsView = ({ navigation }) => {
  return (
    <View style={[styles.container]}>
      <>
        <View style={styles.innerView}>
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{ width: '35%' }}>
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(16),
                  }}>
                  <Image source={backCaret} style={styles.backCaret} />
                  <Text style={styles.leftHeaderText}>Home</Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { width: '30%' }]}>
                Settings
              </Text>
              <View style={{ width: '35%' }} />
            </View>
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Favorite Softwares</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Account type</Text>
          </View> */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert('Sign Out', '', [
                {
                  text: 'No',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'SignIn' }],
                    });
                  },
                },
              ]);
            }}>
            <Text style={styles.rowText}>Sign Out</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    height: hp(10),
    width: '100%',
    backgroundColor: colors.main,
  },
  innerHeader: {
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backCaret: {
    tintColor: '#fff',
    height: 17,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    marginVertical: 1,
    height: hp(5),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  rowText: {
    marginLeft: 10,
  },
  leftHeaderText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default SettingsView;
