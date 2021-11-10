/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, EventHandler, SetStateAction, useState } from 'react';
import { Image, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  ref: any;
  inputName: string;
  set: (value: string) => void;
  placeholder: string;
  secured?: boolean;
  autoCapitalize?: boolean;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onEndEditing: () => {};
}

const Input = (props: Props) => {
  const {
    ref,
    inputName = 'input',
    set,
    placeholder,
    secured = false,
    autoCapitalize = false,
    autoFocus = false,
    keyboardType = 'default',
    returnKeyType,
    onEndEditing,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{inputName}</Text>
      <View style={{ marginTop: hp(2) }}>
        <TextInput
          ref={ref}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          secureTextEntry={secured}
          style={styles.input}
          onChangeText={set}
          placeholder={placeholder}
          placeholderTextColor="#CCCBCB"
          autoCapitalize={autoCapitalize ? 'words' : 'none'}
          autoCompleteType="off"
          autoCorrect={false}
          returnKeyType={returnKeyType}
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(80),
  },
  title: {
    fontSize: 15,
    color: '#23B7FF',
    fontWeight: '600',
  },
  input: {
    fontSize: 15,
    color: '#494949',
    width: '100%',
    textAlign: 'left',
    borderBottomColor: '#CCCBCB',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

export default Input;
