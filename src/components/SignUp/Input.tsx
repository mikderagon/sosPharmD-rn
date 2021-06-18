/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, EventHandler, SetStateAction, useState } from 'react';
import { Image } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  set: Dispatch<SetStateAction<any>>;
  placeholder: string;
  secured?: boolean;
}

const Input = (props: Props) => {
  const { set, placeholder, secured = false } = props;
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secured}
        style={styles.input}
        onChangeText={set}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#B4B4B4',
    borderWidth: 2,
    height: hp(5.5),
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameImage: {
    resizeMode: 'contain',
    height: '95%',
  },
  input: {
    fontSize: 16,
    color: '#aaa',
    width: '90%',
    textAlign: 'left',
  },
});

export default Input;
