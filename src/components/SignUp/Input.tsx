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
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  inputName: string;
  set: Dispatch<SetStateAction<any>>;
  placeholder: string;
  secured?: boolean;
  autoCapitalize?: boolean;
}

const Input = (props: Props) => {
  const {
    inputName = 'input',
    set,
    placeholder,
    secured = false,
    autoCapitalize = false,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{inputName}</Text>
      <View style={{ marginTop: hp(2) }}>
        <TextInput
          secureTextEntry={secured}
          style={styles.input}
          onChangeText={set}
          placeholder={placeholder}
          placeholderTextColor="#CCCBCB"
          autoCapitalize={autoCapitalize ? 'words' : 'none'}
          autoCompleteType="off"
          autoCorrect={false}
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
