/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import * as firestore from '../../server/firestore';
import { store } from '../../store';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Button from '../SignUp/Button';
import Form, { fields, locumFields, ownerFields, signUpFormData } from './Form';
import { User, Locum, Owner, Pharmacy } from '../../models';

const SignUpLocumView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);
  const [isLocum, setIsLocum] = useState(true);
  const [userData, setUserData] = useState({} as signUpFormData);
  const [allFieldsEntered, setAllFieldsEntered] = useState(false);
  const [spinnerActive, setSpinnerActive] = useState(false);

  // form completion verificator
  useEffect(() => {
    if (
      Object.keys(userData).length ===
      fields.length + (isLocum ? locumFields.length : ownerFields.length)
    ) {
      let status = true;
      for (let value of Object.values(userData)) {
        if (!value.length) {
          status = false;
          break;
        }
      }
      setAllFieldsEntered(status);
    }
  }, [userData, isLocum]);

  useEffect(() => {
    // feed schools and pharmacies arrays for signup form autocompletes
    firestore.getSignupData(dispatch);
  }, [dispatch]);

  function handleSignUp(data: signUpFormData) {
    if (allFieldsEntered) {
      firestore
        .createUser(data)
        .then((user: Locum | Owner) => {
          dispatch({
            type: 'SET_CURRENT_USER',
            currentUser: user,
          });
          if (user.accountType === 'locum') {
            firestore.initLocumData(user as Locum, dispatch);
          } else {
            firestore.initOwnerData(user as Owner, dispatch);
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        })
        .catch((e: Error) => {
          setSpinnerActive(false);
          console.error('error trying to signup:', e);
          Alert.alert(e.message.split(']')[1]);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <Form
          isLocum={isLocum}
          setIsLocum={setIsLocum}
          setValue={(key: string, value: string) => {
            setUserData({ ...userData, [key]: value });
          }}
          deleteKeys={(keys: string[]) => {
            const newUserData = { ...userData };
            for (const key of keys) {
              delete newUserData[key];
            }
            setUserData({ ...newUserData });
          }}
          setUntouchable={() => setAllFieldsEntered(false)}
          schools={state.schools}
          pharmacies={state.pharmacies}
        />
      </View>

      <View style={styles.footer}>
        <View style={{ marginTop: hp(2) }}>
          <Button
            loading={spinnerActive}
            active={allFieldsEntered}
            onPress={() => {
              setSpinnerActive(true);
              handleSignUp({
                ...userData,
                accountType: isLocum ? 'locum' : 'owner',
              });
            }}
            text={state.language === 'fr' ? "S'inscrire" : 'Sign Up'}
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
    alignItems: 'center',
  },
  flatListContainer: {
    height: hp(77),
    // marginTop: hp(3),
    alignItems: 'center',
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

export default SignUpLocumView;
