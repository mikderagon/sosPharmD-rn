import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import AnimatedTrail from '../../components/Animations';
import LoginButton from '../../components/Button/LoginButton';
import { Input } from '../../components/TextInput';
import { NavigationProps } from '../../navigation/types';
import signIn from '../../shared/api/signIn';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import colors from '../../shared/styles/colors';
import { store } from '../../store';

const usernameImage = require('assets/images/user.png');
const passwordImage = require('assets/images/password.png');

const SignInView = ({ navigation }: NavigationProps) => {
  const { state, dispatch } = useContext(store);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  console.log('errors:', errors);

  // (DEV ENV ONLY) autologin
  // const [iter, setIter] = useState(0);
  // if (auth().currentUser && iter === 0) {
  //   setIter(iter + 1);
  //   handleSignIn(auth().currentUser.email, 'sospharmd');
  // }

  type onSubmitProps = {
    email: string;
    password: string;
  };
  const onSubmit = async ({ email, password }: onSubmitProps) => {
    console.log('submitted data:', email, password);
    try {
      const signedUser = await signIn({ email, password });
      dispatch({
        type: 'SET_CURRENT_USER',
        currentUser: signedUser,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e) {
      console.log('error trying to sign in a user', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>
          {state.language === 'fr' ? 'Connexion' : 'Login'}
        </Text>
        <AnimatedTrail side="left" language={state.language} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ marginTop: hp(6) }}>
          <Input
            autoFocus
            name="email"
            control={control}
            placeholder={
              state.language === 'fr' ? 'Addresse courrielle' : 'Email'
            }
            imageSource={usernameImage}
          />
        </View>
        <View style={{ marginTop: hp(4) }}>
          <Input
            name="password"
            control={control}
            placeholder={state.language === 'fr' ? 'Mot de passe' : 'Password'}
            imageSource={passwordImage}
          />
        </View>
        <View style={{ marginTop: hp(4) }}>
          <LoginButton
            loading={spinnerActive}
            onPress={handleSubmit(onSubmit)}
            text={state.language === 'fr' ? 'Se connecter' : 'Log in'}
          />
        </View>
        <View style={{ marginTop: hp(3) }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('forgotPassword');
            }}>
            <Text style={[styles.boldText, { color: colors.main }]}>
              {state.language === 'fr'
                ? 'Mot de passe oublié?'
                : 'Forgot Password?'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: hp(3) }}>
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.regularText}>
              {state.language === 'fr'
                ? 'Pas de compte?'
                : "Don't have an account?"}
            </Text>
            <Text style={[styles.boldText, { color: colors.main }]}>
              {' '}
              {state.language === 'fr' ? 'Inscrivez-vous' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  scrollView: {
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
  or: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.darkerBlue,
  },
  customUnderline: {
    marginTop: 3,
    height: 2,
    width: wp(40),
    backgroundColor: colors.darkerBlue,
  },
  logo: {
    height: hp(20),
    resizeMode: 'contain',
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

export default SignInView;
