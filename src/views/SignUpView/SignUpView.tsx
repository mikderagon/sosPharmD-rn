import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AnimatedTrail } from '../../components/Animations';
import Button from '../../components/Button/LoginButton';
import { Input, PasswordInput } from '../../components/TextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import * as firestore from '../../server/firestore';
import { store } from '../../store';
import colors from '../../styles/colors';

const SignUpLocumView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  const usernameImage = require('../../../assets/images/usernameImage.png');

  useEffect(() => {
    // feed schools and pharmacies arrays for signup form autocompletes
    firestore.getSignupData(dispatch);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.caretPosition}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/backCaret.png')} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>
          {state.language === 'fr' ? 'Inscription' : 'Sign Up'}
        </Text>
        <AnimatedTrail side="right" language={state.language} />
      </View>

      <View style={{ marginTop: hp(2) }}>
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text style={styles.regularText}>
            {state.language === 'fr'
              ? 'Vous avez un compte?'
              : 'Have an account?'}
          </Text>
          <Text style={[styles.boldText, { color: colors.main }]}>
            {' '}
            {state.language === 'fr' ? 'Connectez-vous' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView>
        <View style={{ marginTop: hp(2) }}>
          <Input
            autoFocus
            name="firstName"
            control={control}
            placeholder={state.language === 'fr' ? 'Prénom' : 'First name'}
          />
        </View>
        <View style={{ marginTop: hp(2) }}>
          <Input
            name="lastName"
            control={control}
            placeholder={state.language === 'fr' ? 'Nom' : 'Last name'}
          />
        </View>
        <View style={{ marginTop: hp(2) }}>
          <Input
            name="emailAddress"
            control={control}
            placeholder={
              state.language === 'fr' ? 'Addresse courriel' : 'Email address'
            }
          />
        </View>
        <View style={{ marginTop: hp(2) }}>
          <PasswordInput
            name="password"
            control={control}
            placeholder={state.language === 'fr' ? 'Mot de passe' : 'Password'}
          />
        </View>
        <View style={{ marginTop: hp(2) }}>
          <Button
            loading={false}
            onPress={handleSubmit(onSubmit)}
            text={state.language === 'fr' ? 'Créer le compte' : 'Sign up'}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  caretPosition: {
    position: 'absolute',
    top: hp(10),
    left: wp(10),
  },
  titleContainer: {
    marginTop: hp(10),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: wp(11),
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.darkerBlue,
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
  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '500',
    fontSize: 15,
  },
  regularText: {
    fontWeight: '300',
    fontSize: 14,
  },
});

export default SignUpLocumView;
