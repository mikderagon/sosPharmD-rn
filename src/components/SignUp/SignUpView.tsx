/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { store } from '../../store';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Button from '../SignUp/Button';
import Input from './Input';

const SignUpLocumView = ({ navigation }) => {
  const { state } = useContext(store);
  const [isLocum, setIsLocum] = useState(true);
  const [userData, setUserData] = useState({});
  const [allFieldsEntered, setAllFieldsEntered] = useState(false);

  let fields = [
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
      key: 'email',
      value: state.language === 'french' ? 'Courriel' : 'Email',
    },
    {
      key: 'password',
      value: state.language === 'french' ? 'Mot de passe' : 'Password',
      secured: true,
    },
    {
      key: 'birthdate',
      value:
        state.language === 'french' ? 'Date de naissance' : 'Date of birth',
    },
    {
      key: 'address',
      value: state.language === 'french' ? 'Addresse' : 'Address',
    },
    {
      key: 'city',
      value: state.language === 'french' ? 'Ville' : 'City',
    },
    {
      key: 'postalCode',
      value: state.language === 'french' ? 'Code postal' : 'Postal Code',
    },
    // {
    //   key: 'diploma',
    //   value: state.language === 'french' ? 'Diplome' : 'Diploma',
    // },
    {
      key: 'educationalInstitution',
      value:
        state.language === 'french'
          ? 'Institution académique'
          : 'Educational Institution',
    },
    {
      key: 'pharmacy',
      value: state.language === 'french' ? 'Pharmacie' : 'Pharmacy',
    },
    // {
    //   key: 'knownSoftwares',
    //   value:
    //     state.language === 'french'
    //       ? 'Expériences avec logiciels'
    //       : 'Software Experiences',
    // },
  ];

  useEffect(() => {
    if (Object.keys(userData).length === fields.length) {
      let status = true;
      for (let value of Object.values(userData)) {
        if (!value.length) {
          status = false;
          break;
        }
      }
      setAllFieldsEntered(status);
    }
  }, [userData, fields.length]);

  function handleSignUp(userData: any) {
    if (allFieldsEntered) {
      console.log(userData);
      auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(newUser => {
          console.log('new user signed up:', newUser);
          // upsert into firestore
        })
        .then(createdUser => {
          console.log('created this user document:', createdUser);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        })
        .catch(e => {
          console.log('error trying to signup:', e);
        });
    }
  }

  if (isLocum) {
    // remove owner fields
    const fieldsToRemove = ['pharmacy'];
    const fieldsToKeep = fields.filter(
      field => !fieldsToRemove.includes(field.key),
    );
    fields = fieldsToKeep;
  } else {
    // remove locum fields
    const fieldsToRemove = ['educationalInstitution'];
    const fieldsToKeep = fields.filter(
      field => !fieldsToRemove.includes(field.key),
    );
    fields = fieldsToKeep;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <KeyboardAwareFlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={['accountType', ...fields]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item === 'accountType' ? (
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
                      {!isLocum && (
                        <Text style={styles.unchosenType}>Locum</Text>
                      )}
                    </TouchableOpacity>
                    <View style={{ width: wp(5) }} />
                    <TouchableOpacity onPress={() => setIsLocum(false)}>
                      {!isLocum && (
                        <Text style={styles.chosenType}>Propriétaire</Text>
                      )}
                      {isLocum && (
                        <Text style={styles.unchosenType}>Propriétaire</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[{ marginTop: hp(3) }]}>
                <Input
                  inputName={item.value}
                  placeholder={item.value}
                  autoCapitalize={item.autoCapitalize}
                  secured={item.secured}
                  set={(value: string) =>
                    setUserData({ ...userData, [item.key]: value })
                  }
                />
              </View>
            )
          }
          ListFooterComponent={() => <View style={{ height: hp(5) }} />}
          keyboardOpeningTime={10}
          extraScrollHeight={hp(2)}
          getItemLayout={(data, index) => ({
            length: hp(10),
            offset: hp(10 + 3) * index + hp(3),
            index,
          })}
        />
      </View>

      <View style={styles.footer}>
        <View style={{ marginTop: hp(2) }}>
          <Button
            active={allFieldsEntered}
            onPress={() => {
              handleSignUp({
                ...userData,
                accountType: isLocum ? 'locum' : 'owner',
              });
            }}
            text={state.language === 'french' ? "S'inscrire" : 'Sign Up'}
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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '50%',
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

export default SignUpLocumView;
