/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { store } from '../../store';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Button from '../SignIn/Button';
import Input from './Input';

const SignUpView = ({ navigation }) => {
  const { state } = useContext(store);
  const fields = [
    {
      key: 'email',
      value: state.language === 'french' ? 'Courriel' : 'Email',
    },
    {
      key: 'firstName',
      value: state.language === 'french' ? 'Prénom' : 'First Name',
      autoCapitalize: true,
    },
    {
      key: 'lastName',
      value: state.language === 'french' ? 'Nom' : 'Last Name',
      autoCapitalize: true,
    },
    {
      key: 'dob',
      value: 'Date of Birth',
    },
    {
      key: 'gender',
      value: 'Sex at Birth',
    },
    {
      key: 'address',
      value: 'Address',
    },
    {
      key: 'city',
      value: 'City',
    },
    {
      key: 'diploma',
      value: 'Diploma',
    },
    {
      key: 'educationalInstitution',
      value: 'Educational Institution',
    },
    {
      key: 'knownSoftwares',
      value: 'Known Softwares',
    },
  ];
  const [userData, setUserData] = useState({});
  const allFieldsEntered = true;
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <KeyboardAwareFlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={fields}
          renderItem={({ item }) => (
            <View style={[{ marginTop: hp(3) }]}>
              <Input
                inputName={item.value}
                placeholder={item.value}
                autoCapitalize={item.autoCapitalize}
                set={() => setUserData({ ...userData, [item.key]: item.key })}
              />
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: hp(5) }} />}
          keyboardOpeningTime={10}
        />
      </View>

      <View style={styles.footer}>
        <View style={{ marginTop: hp(2) }}>
          <Button
            active={allFieldsEntered}
            onPress={() => {
              navigation.navigate('Home');
            }}
            text={state.language === 'french' ? "S'enregistrer" : 'Sign Up'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  flatListContainer: {
    height: hp(77),
  },
  footer: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { height: -1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    bottom: 0,
    marginBottom: hp(10),
    height: hp(13),
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default SignUpView;
