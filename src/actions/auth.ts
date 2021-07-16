import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { signUpFormData } from '../components/SignUp/Form';
import { Locum, Owner } from '../models';

export function createUser(userData: signUpFormData): Promise<Locum | Owner> {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(newUser => {
        return Promise.all([newUser, newUser.user.sendEmailVerification()]);
      })
      .then(async ([newUser, _]) => {
        const requiredData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          pictureUrl: null,
          address: userData.address,
          accountType: userData.accountType,
        };
        // get pharmacyId
        const pharmacy =
          userData.accountType === 'locum'
            ? null
            : (
                await firestore()
                  .collection('pharmacies')
                  .where('address', '==', userData.pharmacy)
                  .get()
              ).docs[0].data();

        // upsert into firestore
        firestore()
          .collection('users')
          .doc(newUser.user.uid)
          .set(
            userData.accountType === 'locum'
              ? {
                  ...requiredData,
                  school: userData.school,
                  schoolYear: userData.schoolYear,
                }
              : {
                  ...requiredData,
                  pharmacy,
                },
          );
        return newUser;
      })
      .then(async newUser => {
        // retrieve from firestore
        const { _data } = await firestore()
          .collection('users')
          .doc(newUser.user.uid)
          .get();
        console.log(_data);
        resolve({
          ..._data,
          id: newUser.user.uid,
          email: newUser.user.email,
          emailVerified: newUser.user.emailVerified,
        } as Locum | Owner);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export function signIn(
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

export function getUser(
  firebaseUser: FirebaseAuthTypes.User,
): Promise<Locum | Owner> {
  return new Promise(async (resolve, reject) => {
    firestore()
      .collection('users')
      .doc(firebaseUser.uid)
      .get()
      .then(user => {
        resolve({
          ...user.data(),
          id: user.id,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
        } as Locum | Owner);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(() => {
        resolve('signed out');
      })
      .catch(e => {
        reject('error trying to signout' + e);
      });
  });
}
