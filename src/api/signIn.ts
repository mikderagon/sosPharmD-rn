import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

type signInProps = {
  email: string;
  password: string;
};

export function authsignIn(
  email: string,
  password: string,
): Promise<Locum | Owner> {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        const { _data } = await firestore()
          .collection('users')
          .doc(user.user.uid)
          .get();
        resolve({
          ..._data,
          id: user.user.uid,
          email: user.user.email,
          emailVerified: user.user.emailVerified,
        } as Locum | Owner);
      })
      .catch(e => {
        reject(e);
      });
  });
}

const signIn = ({ email, password }: signInProps) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        const foundUser = await firestore()
          .collection('users')
          .doc(user.user.uid)
          .get();
        console.log('got some user data:', foundUser.data());
        return {
          ...foundUser.data(),
          id: user.user.uid,
          email: user.user.email,
          emailVerified: user.user.emailVerified,
        };
      })
      .then(user => {
        console.log('resolving user', user);
        resolve(user);
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });
  });

  firestore
    .signIn(_email || email, _password || password)
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
    .catch(e => {
      Alert.alert('No user');
    });
};

export default signIn;
