/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction, createRef, useRef } from 'react';
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

type field = {
  key: string;
  fr: string;
  eng: string;
  autoCapitalize?: boolean;
  secured?: boolean;
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
  {
    key: 'address',
    fr: 'Addresse',
    eng: 'Address',
  },
  {
    key: 'city',
    fr: 'Ville',
    eng: 'City',
  },
];

export interface signUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  accountType: 'locum' | 'owner';
  educationalInstitution?: string;
  pharmacy?: string;
}

export const locumFields: field[] = [
  {
    key: 'educationalInstitution',
    fr: 'Institution académique',
    eng: 'Educational Institution',
  },
];

export const ownerFields: field[] = [
  {
    key: 'pharmacy',
    fr: 'Pharmacie',
    eng: 'Pharmacy',
  },
];

interface Props {
  isLocum: boolean;
  setIsLocum: Dispatch<SetStateAction<boolean>>;
  language?: string;
  setValue: (key: string, value: string) => void;
}

const Form = (props: Props) => {
  const { isLocum, setIsLocum, language = 'fr', setValue } = props;
  // the whole way this component is written is very dirty, but had no time to find how to use refs in an array
  // TODO: find a library for react forms. eg https://formik.org
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);
  const input7 = useRef(null);
  const fieldsList = [...fields, ...(isLocum ? locumFields : ownerFields)];
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
      contentInset={{ bottom: hp(10) }}>
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
            <TouchableOpacity onPress={() => setIsLocum(true)}>
              {isLocum && <Text style={styles.chosenType}>Locum</Text>}
              {!isLocum && <Text style={styles.unchosenType}>Locum</Text>}
            </TouchableOpacity>
            <View style={{ width: wp(5) }} />
            <TouchableOpacity onPress={() => setIsLocum(false)}>
              {!isLocum && <Text style={styles.chosenType}>Propriétaire</Text>}
              {isLocum && <Text style={styles.unchosenType}>Propriétaire</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {[...fields, ...(isLocum ? locumFields : ownerFields)].map(
        ({ key, fr, eng, autoCapitalize, secured }, index) => (
          <View key={index} style={{ marginTop: hp(3) }}>
            <Input
              ref={input1}
              autoFocus={index === 0}
              autoCapitalize={autoCapitalize}
              secured={secured}
              inputName={language === 'fr' ? fr : eng}
              placeholder={language === 'fr' ? fr : eng}
              set={(value: string) => setValue(key, value)}
              returnKeyType={
                index ===
                [...fields, ...(isLocum ? locumFields : ownerFields)].length - 1
                  ? 'done'
                  : 'next'
              }
              onEndEditing={() => inputRefs[index + 1].current.focus()}
            />
          </View>
        ),
      )} */}
      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[0].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input1}
              autoFocus
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
                setValue(fieldsList[5].key, value)
              }
              style={inputStyles.input}
              placeholder={fieldsList[5].fr}
              placeholderTextColor="#CCCBCB"
              autoCapitalize={'words'}
              returnKeyType={'next'}
              onSubmitEditing={() => input7.current.focus()}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: hp(3) }}>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>{fieldsList[6].fr}</Text>
          <View style={{ marginTop: hp(2) }}>
            <TextInput
              ref={input7}
              onChangeText={(value: string) =>
                setValue(fieldsList[6].key, value)
              }
              style={inputStyles.input}
              placeholder={fieldsList[6].fr}
              placeholderTextColor="#CCCBCB"
              autoCapitalize={'words'}
              returnKeyType={'next'}
            />
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
