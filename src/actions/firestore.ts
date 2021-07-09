import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import _ from 'underscore';
import { signUpFormData } from '../components/SignUp/Form';
import { ContractTag, LocumTag } from '../interfaces';
import { Locum, Owner, User, Event } from '../models';
import * as dates from '../utils/dates';

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

export async function initOwnerData(dispatch: any) {
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
    const thisMonthEvents = getMonthEvents(events);
    const thisMonthEventDates = getMonthEventDates(thisMonthEvents);
    const locumTags = await getLocumTags(thisMonthEvents);
    dispatch({
      type: 'SET_THIS_MONTH_EVENTS',
      thisMonthEvents,
    });
    dispatch({
      type: 'SET_THIS_MONTH_EVENT_DATES',
      thisMonthEventDates,
    });
    dispatch({
      type: 'SET_LOCUM_TAGS',
      locumTags,
    });
  }
}

export async function initLocumData(dispatch: any) {
  const { docs } = await firestore().collection('events').get();
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
    const thisMonthEvents = getMonthEvents(events);
    const thisMonthEventDates = thisMonthEvents.map(event => event.day).sort();
    const contracts = await getContractTags(thisMonthEvents);
    dispatch({
      type: 'SET_THIS_MONTH_EVENTS',
      thisMonthEvents,
    });
    dispatch({
      type: 'SET_THIS_MONTH_EVENT_DATES',
      thisMonthEventDates,
    });
    dispatch({
      type: 'SET_CONTRACTS',
      contracts,
    });
  }
}

export async function findUser<T>(uid: string): Promise<T> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(user => {
        resolve(user.data() as T);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export function getMonthEvents(events: Event[]) {
  const CalendarState = dates.getCalendarState(new Date());
  const thisMonthEvents = events.filter(
    event =>
      event.year === CalendarState.year && event.month === CalendarState.month,
  );
  return thisMonthEvents;
}

export function getMonthEventDates(thisMonthEvents: Event[]) {
  const thisMonthEventDates = _.flatten(
    thisMonthEvents.map(e =>
      Array.from({ length: e.interestedLocums?.length || 0 }).fill(e.day),
    ),
  );
  return thisMonthEventDates.sort();
}

export async function getLocumTags(
  thisMonthEvents: Event[],
): Promise<LocumTag[]> {
  let locums = [];
  for (const event of thisMonthEvents) {
    const theLocumsAre = event.interestedLocums;
    if (theLocumsAre?.length) {
      for (const locum of theLocumsAre) {
        const locumFound = await findUser<Locum>(locum.toString());
        if (locumFound) {
          locums.push({
            user: locumFound,
            date: { day: event.day, month: event.month, year: event.year },
          } as LocumTag);
        }
      }
    }
  }
  return locums;
}

export async function getContractTags(
  thisMonthEvents: Event[],
): Promise<ContractTag[]> {
  let contracts = [];
  for (const event of thisMonthEvents) {
    const owner = await findUser<Owner>(event.UserId);
    if (owner) {
      contracts.push({
        user: owner,
        date: { day: event.day, month: event.month, year: event.year },
      } as ContractTag);
    }
  }
  return contracts;
}

export function batchUpsertEvents(events: Event[]) {
  return new Promise((resolve, reject) => {
    Promise.all([
      events.map(event => {
        const pureObject = Object.assign({}, event);
        return firestore()
          .collection('events')
          .add({
            ...pureObject,
          });
      }),
    ])
      .then(() => resolve('success'))
      .catch(e => reject(e));
  });
}
