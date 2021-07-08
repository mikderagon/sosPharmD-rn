/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Input from './Input';

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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
      contentInset={{ bottom: hp(5) }}>
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
      {[...fields, ...(isLocum ? locumFields : ownerFields)].map(
        ({ key, fr, eng, autoCapitalize, secured }, index) => (
          <View key={index} style={{ marginTop: hp(3) }}>
            <Input
              autoCapitalize={autoCapitalize}
              secured={secured}
              inputName={language === 'fr' ? fr : eng}
              placeholder={language === 'fr' ? fr : eng}
              set={(value: string) => setValue(key, value)}
            />
          </View>
        ),
      )}
    </ScrollView>
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

export default Form;
