import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AnimatedTrail from '../../components/Animations';
import Button from '../../components/Button/LoginButton';
import { Input, PasswordInput } from '../../components/TextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import colors from '../../shared/styles/colors';
import { store } from '../../store';

const SignUpLocumView = ({ navigation }) => {
  const { state, dispatch } = useContext(store);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>
          {state.language === 'fr' ? 'Inscription' : 'Sign Up'}
        </Text>
        <AnimatedTrail side="left" language={state.language} />
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
