/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';

interface Props {
  autoFocus?: boolean;
  set: Dispatch<SetStateAction<any>>;
  placeholder: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

const Input = (props: Props) => {
  const {
    autoFocus = false,
    set,
    placeholder,
    value,
    keyboardType = 'default',
    maxLength = 100,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}:</Text>
      <TextInput
        autoFocus={autoFocus}
        style={styles.input}
        onChangeText={set}
        // placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#494949',
    borderWidth: 0.2,
    height: hp(5),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '200',
    color: colors.darkerBlue,
  },
  input: {
    marginLeft: 5,
    fontSize: 15,
    color: '#494949',
    width: '90%',
    textAlign: 'left',
    fontWeight: '400',
  },
});

export default Input;
