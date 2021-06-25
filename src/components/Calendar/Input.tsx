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
  placeholder: string;
}

const Input = (props: Props) => {
  const { autoFocus = false, set, placeholder } = props;
  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={autoFocus}
        style={styles.input}
        onChangeText={set}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
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
    backgroundColor: '#ddd',
    borderColor: '#494949',
    borderWidth: 0.2,
    height: hp(5),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: '#494949',
    width: '90%',
    textAlign: 'left',
  },
});

export default Input;
