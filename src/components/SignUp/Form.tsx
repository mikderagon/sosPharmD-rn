/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Input from './Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect } from 'react';
import { School, Pharmacy } from '../../models';

type field = {
  key: string;
  fr: string;
  eng: string;
  placeholder?: string;
  autoCapitalize?: boolean;
  secured?: boolean;
  autoComplete?: boolean;
};

export const fields: field[] = [
  {
    key: 'firstName',
    fr: 'Prénom',
    eng: 'First Name',
    autoCapitalize: true,
  },
  {
    key: 'lastName',
    fr: 'Nom',
    eng: 'Last Name',
    autoCapitalize: true,
  },
  {
    key: 'email',
    fr: 'Courriel',
    eng: 'Email',
  },
  {
    key: 'password',
    fr: 'Mot de passe',
    eng: 'Password',
    secured: true,
  },
  { key: 'address', fr: 'Addresse', eng: 'Address' },
];

export interface signUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  accountType: 'locum' | 'owner';
  school?: string;
  pharmacy?: string;
}

export const locumFields: field[] = [
  {
    key: 'school',
    fr: 'Institution académique',
    eng: 'Educational Institution',
    placeholder: 'ex: Université de Montréal',
    autoComplete: true,
  },
];

export const ownerFields: field[] = [
  {
    key: 'pharmacy',
    fr: 'Pharmacie',
    eng: 'Pharmacy',
    placeholder: 'ex: 450 Boulevard de Montmagny',
    autoComplete: true,
  },
];

interface Props {
  isLocum: boolean;
  setIsLocum: Dispatch<SetStateAction<boolean>>;
  language?: string;
  setValue: (key: string, value: string) => void;
  deleteKey: (key: string) => void;
  setUntouchable: () => void;
  schools: School[];
  pharmacies: Pharmacy[];
}

const Form = (props: Props) => {
  const {
    isLocum,
    setIsLocum,
    language = 'fr',
    setValue,
    deleteKey,
    setUntouchable,
    schools,
    pharmacies,
  } = props;
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [autocompleteChoice, setAutocompleteChoice] = useState('');
  // the whole way this component is written is very dirty, but had no time to find how to use refs in an array
  // TODO: find a library for react forms. eg https://formik.org
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);
  const fieldsList = [...fields, ...(isLocum ? locumFields : ownerFields)];

  // autofocus alternative
  useEffect(() => {
    setTimeout(() => {
      input1.current.focus();
    }, 100);
  }, []);

  function onAccountTypeSwitch(_isLocum: boolean) {
    setIsLocum(_isLocum);
    setAutocompleteChoice('');
    setAutocompleteValue('');
    deleteKey(fieldsList[5].key);
    setUntouchable();
  }

  function string_cleanup(str: string) {
    let new_str = str.toLowerCase();
    new_str = new_str.replace(new RegExp(/[èéêë]/g), 'e');
    return new_str;
  }

  function autocomplete(key: string, value: string) {
    setAutocompleteValue(value);
    if (value === '') {
      setAutocompleteChoice('');
      return;
    }
    if (key === 'school') {
      var choices = schools.map(school => school.name);
      const matches = choices.filter(choice => {
        if (string_cleanup(choice).includes(string_cleanup(value))) {
          return choice;
        }
      });
      setAutocompleteChoice(matches[0] || '');
    } else {
      // key === 'pharmacy'
      var choices = pharmacies.map(pharmacy => pharmacy.address);
      const matches = choices.filter(choice => {
        if (string_cleanup(choice).includes(string_cleanup(value))) {
          return choice;
        }
      });
      setAutocompleteChoice(matches[0] || '');
    }
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
      // contentInset={{ bottom: 20 }}
      extraHeight={400}>
      <View style={{ width: wp(80), marginTop: hp(3) }}>
        <Text
          style={{
            fontSize: 15,
            color: '#23B7FF',
            fontWeight: '600',
          }}>
          Type de compte
        </Text>
        <View style={{ marginTop: hp(2) }}>
          <View
            style={[
              styles.buttonsContainer,
              {
                marginTop: hp(0),
              },
            ]}>
            <TouchableOpacity onPress={() => onAccountTypeSwitch(true)}>
              {isLocum && <Text style={styles.chosenType}>Locum</Text>}
              {!isLocum && <Text style={styles.unchosenType}>Locum</Text>}
            </TouchableOpacity>
            <View style={{ width: wp(5) }} />
            <TouchableOpacity onPress={() => onAccountTypeSwitch(false)}>
              {!isLocum && <Text style={styles.chosenType}>Propriétaire</Text>}
              {isLocum && <Text style={styles.unchosenType}>Propriétaire</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[0].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input1}
              onChangeText={(value: string) =>
                setValue(fieldsList[0].key, value)
              }
              style={inputStyles.input}
              placeholder={fieldsList[0].fr}
              placeholderTextColor="#CCCBCB"
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => input2.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[1].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input2}
              onChangeText={(value: string) =>
                setValue(fieldsList[1].key, value)
              }
              style={inputStyles.input}
              placeholder={fieldsList[1].fr}
              placeholderTextColor="#CCCBCB"
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType={'next'}
              onSubmitEditing={() => input3.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[2].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input3}
              keyboardType="email-address"
              onChangeText={(value: string) =>
                setValue(fieldsList[2].key, value)
              }
              autoCapitalize="none"
              style={inputStyles.input}
              placeholder={fieldsList[2].fr}
              placeholderTextColor="#CCCBCB"
              returnKeyType={'next'}
              onSubmitEditing={() => input4.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[3].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input4}
              secureTextEntry
              onChangeText={(value: string) =>
                setValue(fieldsList[3].key, value)
              }
              autoCapitalize="none"
              style={inputStyles.input}
              placeholder={fieldsList[3].fr}
              placeholderTextColor="#CCCBCB"
              returnKeyType={'next'}
              onSubmitEditing={() => input5.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[4].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input5}
              onChangeText={(value: string) =>
                setValue(fieldsList[4].key, value)
              }
              autoCapitalize="none"
              style={inputStyles.input}
              placeholder={fieldsList[4].fr}
              placeholderTextColor="#CCCBCB"
              returnKeyType={'next'}
              onSubmitEditing={() => input6.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[5].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input6}
              onChangeText={(value: string) =>
                autocomplete(fieldsList[5].key, value)
              }
              value={autocompleteValue}
              style={inputStyles.input}
              placeholder={fieldsList[5].placeholder}
              placeholderTextColor="#CCCBCB"
              autoCapitalize={'words'}
              returnKeyType={'next'}
            />
            {autocompleteChoice.length > 0 && (
              <TouchableOpacity
                style={{
                  top: 5,
                  right: 0,
                  height: 27,
                  // width: '70%',
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  backgroundColor: colors.main,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setValue(fieldsList[5].key, autocompleteChoice);
                  setAutocompleteValue(autocompleteChoice);
                  setAutocompleteChoice('');
                }}>
                <Text style={{ color: '#fff', fontWeight: '800' }}>
                  {autocompleteChoice}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '50%',
  },
  chosenType: {
    fontSize: 16,
    // color: '#23B7FF',
    color: colors.darkBlue,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  unchosenType: {
    fontSize: 15,
    color: '#cccbcb',
    // fontWeight: '300',
    // textDecorationLine: 'line-through',
  },
});

const inputStyles = StyleSheet.create({
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

export default Form;
