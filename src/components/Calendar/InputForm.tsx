/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';

interface Props {
  onComplete: () => void;
  setTitle: Dispatch<SetStateAction<string>>;
  setMinExperience: Dispatch<SetStateAction<string>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  setEndTime: Dispatch<SetStateAction<string>>;
}

const InputForm = (props: Props) => {
  const { setTitle, setMinExperience, setStartTime, setEndTime, onComplete } =
    props;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Titre:</Text>
        <TextInput
          ref={ref1}
          onSubmitEditing={() => ref2.current.focus()}
          autoFocus
          style={styles.input}
          returnKeyType="next"
          onChangeText={setTitle}
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
        <Text style={styles.label}>Expérience demandée:</Text>
        <TextInput
          ref={ref3}
          style={styles.input}
          onSubmitEditing={() => ref4.current.focus()}
          onChangeText={setMinExperience}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
          returnKeyType="next"
          maxLength={1}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>De:</Text>
        <TextInput
          ref={ref4}
          style={styles.input}
          onSubmitEditing={() => ref5.current.focus()}
          onChangeText={setStartTime}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
          returnKeyType="next"
          maxLength={5}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Jusqu'à:</Text>
        <TextInput
          ref={ref5}
          style={styles.input}
          onSubmitEditing={onComplete}
          onChangeText={setEndTime}
          // placeholder={placeholder}
          placeholderTextColor="#aaa"
          // value={value}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
          maxLength={5}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
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
