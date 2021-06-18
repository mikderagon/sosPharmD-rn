/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useRef } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

const SignUpView = ({ navigation }: NavigationProps) => {
  const fields = [
    {
      key: 'email',
      value: 'Email',
    },
    {
      key: 'firstName',
      value: 'First Name',
    },
    {
      key: 'lastName',
      value: 'Last Name',
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
  ];
  const [userData, setUserData] = useState({});
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [dob, setDob] = useState('');
  // const [gender, setGender] = useState('');
  // const [address, setAddress] = useState('');
  // const [city, setCity] = useState('');
  // const [diploma, setDiploma] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundSrc} style={styles.backgroundImage}>
        <KeyboardAwareFlatList
          extraScrollHeight={120}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ marginTop: hp(2), alignItems: 'center' }}
          data={fields}
          renderItem={({ item }) => (
            <View style={[{ marginTop: hp(3) }, styles.shadow]}>
              <Input
                placeholder={item.value}
                set={() => setUserData({ ...userData, [item.key]: item.key })}
              />
            </View>
          )}
          keyboardOpeningTime={0}
        />
        <View style={styles.footer}>
          {/* dialog box */}
          {/* <View style={[styles.dialogBox, { marginBottom: hp(18) }]}>
            <View style={styles.triangle} />
            <Text style={styles.dialogText}>
              <Text style={styles.regularText}>Step 1: {'\n'} </Text>
              <Text style={styles.boldText}>Hello world</Text>
            </Text>
          </View> */}

          <View style={styles.checkpointsContainer}>
            <View style={styles.checkpoint} />
            <View style={styles.progressLine} />
            <View style={styles.checkpoint} />
            <View style={styles.progressLine} />
            <View style={styles.checkpoint} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#fff',
    height: hp(5),
    width: '100%',
  },
  backCaret: {
    height: hp(3),
    resizeMode: 'contain',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: hp(10),
    height: hp(13),
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 3 },
  },
  dialogBox: {
    backgroundColor: '#1D2366',
    height: hp(7),
    width: wp(36),
    borderRadius: wp(3),
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkpoint: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  progressLine: {
    height: 1,
    width: wp(24),
    backgroundColor: 'red',
  },
});

export default SignUpView;
