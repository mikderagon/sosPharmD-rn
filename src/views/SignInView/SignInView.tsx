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
import { AnimatedTrail } from '../../components/Animations';
import LoginButton from '../../components/Button/LoginButton';
import { Input } from '../../components/TextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { store } from '../../store';
import colors from '../../styles/colors';
import { NavigationProps } from '../../types';

const usernameImage = require('assets/images/usernameImage.png');
const passwordImage = require('assets/images/passwordImage.png');

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
  const onSubmit = ({ email, password }: onSubmitProps) => {
    console.log('submitted data:', email, password);
  };

  // const handleSignIn = (_email?: string, _password?: string) => {
  //   firestore
  //     .signIn(_email || email, _password || password)
  //     .then((user: Locum | Owner) => {
  //       dispatch({
  //         type: 'SET_CURRENT_USER',
  //         currentUser: user,
  //       });
  //       if (user.accountType === 'locum') {
  //         firestore.initLocumData(user as Locum, dispatch);
  //       } else {
  //         firestore.initOwnerData(user as Owner, dispatch);
  //       }
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Home' }],
  //       });
  //     })
  //     .catch(e => {
  //       setSpinnerActive(false);
  //       Alert.alert('No user');
  //     });
  // };

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
