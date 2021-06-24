/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, useState } from 'react';
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
  autoFocus?: boolean;
  set: Dispatch<SetStateAction<any>>;
  sourceImage: any;
  placeholder: string;
  secured?: boolean;
}

const Input = (props: Props) => {
  const { autoFocus, set, sourceImage, placeholder, secured = false } = props;
  return (
    <View style={styles.container}>
      <Image source={sourceImage} style={styles.usernameImage} />
      <TextInput
        autoFocus={autoFocus}
        secureTextEntry={secured}
        style={styles.input}
        onChangeText={set}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        maxLength={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 50,
    height: hp(5.5),
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameImage: {
    right: wp(1.2),
    resizeMode: 'contain',
    height: '100%',
  },
  input: {
    fontSize: 19,
    color: '#494949',
    width: '70%',
    textAlign: 'center',
  },
});

export default Input;
