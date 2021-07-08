import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { signUpFormData } from '../components/SignUp/Form';
import { Locum, Owner, User, Event } from '../models';

// change type of userData to be the correct types from the signup form and the return type to User model
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
          address: userData.city,
          city: userData.city,
          accountType: userData.accountType,
        };
        // upsert into firestore
        firestore()
          .collection('users')
          .doc(newUser.user.uid)
          .set(
            userData.accountType === 'locum'
              ? {
                  ...requiredData,
                  educationalInstitution: userData.educationalInstitution,
                }
              : {
                  ...requiredData,
                  pharmacy: userData.pharmacy,
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
        resolve({
          ..._data,
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
          email: user.user.email,
          emailVerified: user.user.emailVerified,
        } as Locum | Owner);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export async function initAppWithFirestoreData(dispatch: any) {
  const { docs } = await firestore()
    .collection('events')
    .where('UserId', '==', auth().currentUser.uid)
    .get();
  if (docs.length) {
    const events = docs.map(doc => {
      const data = doc.data();
      const UserId = data.UserId;
      return {
        ...data,
        UserId,
      } as Event;
    });
    dispatch({
      type: 'SET_CALENDAR_EVENTS',
      events,
    });
  }
}
