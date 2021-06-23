/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Input from './Input';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../assets/images/logo.png');
const backgroundSrc = require('../../assets/images/signInBackground.png');
const usernameImage = require('../../assets/images/usernameImage.png');
const passwordImage = require('../../assets/images/passwordImage.png');
import View1 from './View1';
import View2 from './View2';
import View3 from './View3';
import Button from '../SignIn/Button';

const SignUpTab = ({ navigation }: NavigationProps) => {
  const fields = [
    {
      key: 'email',
      value: 'Email',
    },
    {
      key: 'firstName',
      value: 'First Name',
      autoCapitalize: true,
    },
    {
      key: 'lastName',
      value: 'Last Name',
      autoCapitalize: true,
    },
    {
      key: 'dob',
      value: 'Date of Birth',
    },
    {
      key: 'gender',
      value: 'Sex at Birth',
    },
    {
      key: 'address',
      value: 'Address',
    },
    {
      key: 'city',
      value: 'City',
    },
    {
      key: 'diploma',
      value: 'Diploma',
    },
    {
      key: 'educationalInstitution',
      value: 'Educational Institution',
    },
    {
      key: 'knownSoftwares',
      value: 'Known Softwares',
    },
  ];
  const [userData, setUserData] = useState({});
  const allFieldsEntered = true;
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <KeyboardAwareFlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={fields}
          renderItem={({ item }) => (
            <View style={[{ marginTop: hp(3) }]}>
              <Input
                inputName={item.value}
                placeholder={item.value}
                autoCapitalize={item.autoCapitalize}
                set={() => setUserData({ ...userData, [item.key]: item.key })}
              />
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: hp(5) }} />}
          keyboardOpeningTime={10}
        />
      </View>

      <View style={styles.footer}>
        <View style={{ marginTop: hp(2) }}>
          <Button
            active={allFieldsEntered}
            onPress={() => {
              navigation.navigate('AccountConfirmation');
            }}
            text="Next"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  flatListContainer: {
    height: hp(77),
  },
  footer: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { height: -1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    bottom: 0,
    marginBottom: hp(10),
    height: hp(13),
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dialogBox: {
    backgroundColor: '#1D2366',
    height: hp(7),
    width: wp(30),
    borderRadius: wp(3),
    alignItems: 'center',
    bottom: 55,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#1D2366',
    top: 55,
    transform: [{ rotate: '180deg' }],
  },
  dialogText: {
    marginTop: -6,
    textAlign: 'center',
  },
  boldText: {
    color: '#fff',
    fontWeight: '600',
  },
  regularText: {
    color: '#fff',
    fontWeight: '400',
  },

  checkpointsContainer: {
    // backgroundColor: 'red',
    // height: 100,
    // width: 200,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkpoint: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#23B7FF',
  },
  progressLine: {
    height: 1,
    width: wp(20),
    backgroundColor: '#23B7FF',
  },
});

export default SignUpTab;
