/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, useRef } from 'react';
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

interface Props {}

const InputForm = (props: Props) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          ref={ref1}
          onSubmitEditing={() => ref2.current.focus()}
          autoFocus
          style={styles.input}
          returnKeyType="next"
          // onChangeText={set}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCapitalize="sentences"
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="default"
          maxLength={30}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          ref={ref2}
          onSubmitEditing={() => ref3.current.focus()}
          style={styles.input}
          returnKeyType="next"
          // onChangeText={set}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          // keyboardType={keyboardType}
          // maxLength={maxLength}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Min Experience:</Text>
        <TextInput
          ref={ref3}
          style={styles.input}
          // onChangeText={set}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>
    </>
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

export default InputForm;
