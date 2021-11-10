import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import _, { where } from 'underscore';
import { signUpFormData } from '../views/SignUpView/Form';
import { ContractTag, LocumTag } from '../interfaces';
import { Locum, Owner, User, Event, Pharmacy, School } from '../models';
import * as dates from '../utils/dates';
import { signIn, createUser, getUser, signOut } from './auth';

// change type of userData to be the correct types from the signup form and the return type to User model
export { signIn, createUser, getUser, signOut };

export async function getSignupData(dispatch: any) {
  var { docs } = await firestore().collection('pharmacies').get();
  const pharmacies = docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
    } as Pharmacy;
  });
  var { docs } = await firestore().collection('schools').get();
  const schools = docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
    } as School;
  });
  dispatch({
    type: 'SET_SCHOOLS',
    schools,
  });
  dispatch({
    type: 'SET_PHARMACIES',
    pharmacies,
  });
}

export async function initOwnerData(currentUser: Owner, dispatch: any) {
  firestore()
    .collection('events')
    .where('UserId', '==', currentUser.id)
    .onSnapshot(async doc => {
      const events = doc.docs
        .filter(_doc => !_doc.data().archived)
        .map(_doc => {
          const data = _doc.data();
          const UserId = data.UserId;
          return {
            ...data,
            id: _doc.id,
            UserId,
          } as Event;
        });
      dispatch({
        type: 'SET_CALENDAR_EVENTS',
        events,
      });
      const thisMonthEvents = getMonthEvents(events);
      const thisMonthEventDates = getMonthEventDates(thisMonthEvents);
      const interestedLocums = await getInterestedLocums(events);
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
      dispatch({
        type: 'SET_INTERESTED_LOCUMS',
        interestedLocums,
      });
    });
}

export async function initLocumData(currentUser: Locum, dispatch: any) {
  firestore()
    .collection('events')
    .where('minExperience', '<=', currentUser.schoolYear)
    .onSnapshot(async doc => {
      const events = doc.docs
        .filter(_doc => !_doc.data().archived)
        .map(_doc => {
          const data = _doc.data();
          const UserId = data.UserId;
          return {
            ...data,
            id: _doc.id,
            UserId,
            interested: data.interestedLocums.includes(currentUser.id),
          } as Event;
        });
      dispatch({
        type: 'SET_CALENDAR_EVENTS',
        events,
      });
      const availableEvents = events.filter(
        (event: Event) => !event.interestedLocums.includes(currentUser.id),
      );
      const thisMonthEvents = getMonthEvents(availableEvents);
      const thisMonthEventDates = thisMonthEvents
        .map(event => event.day)
        .sort();
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
    });
}

export async function findUser<T>(uid: string): Promise<T & User> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(user => {
        const data = user.data();
        resolve({
          ...data,
          id: uid,
        } as T & User);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export async function findPharmacy(id: string): Promise<Pharmacy> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('pharmacies')
      .doc(id)
      .get()
      .then(pharmacy => {
        resolve(pharmacy.data() as Pharmacy);
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
    thisMonthEvents.map(event => {
      return Array.from({
        length:
          event.interestedLocums.filter(
            interestedLocum => !event.refusedLocums.includes(interestedLocum),
          ).length || 0,
      }).fill(event.day);
    }),
  );
  return thisMonthEventDates.sort();
}

export async function getLocumTags(
  thisMonthEvents: Event[],
): Promise<LocumTag[]> {
  let locums = [];
  for (const event of thisMonthEvents) {
    const theLocumsAre = event.interestedLocums.filter(
      interestedLocum => !event.refusedLocums.includes(interestedLocum),
    );
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
        event,
      } as ContractTag);
    }
  }
  return contracts;
}

export async function getInterestedLocums(events: Event[]) {
  const interestedLocums = await Promise.all(
    events.map(async (event: Event) => {
      return {
        day: event.day,
        year: event.year,
        month: event.month,
        startTime: event.startTime,
        endTime: event.endTime,
        interestedLocums: await Promise.all(
          event.interestedLocums
            .filter(
              interestedLocum => !event.refusedLocums.includes(interestedLocum),
            )
            .map(locum => findUser<Locum>(locum)),
        ),
      };
    }),
  );
  return interestedLocums;
}

export async function getLocumDemands(events: Event[]) {
  // TODO: put this in initOwnerData so we can access them via our store
  const interestedLocums = _.flatten(
    events.map(event => {
      return event.interestedLocums.map(id => {
        return {
          id,
          startTime: event.startTime,
          endTime: event.endTime,
        };
      });
    }),
  );
  const locums = await Promise.all(
    interestedLocums.map(async ({ startTime, endTime, id }) => {
      const interestedLocum = await findUser(id.toString());
      return {
        interestedLocum,
        startTime,
        endTime,
      };
    }),
  );
  return locums;
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

export function applyForContract(event: Event, uid: string) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('events')
      .doc(event.id)
      .get()
      .then(_event => {
        const data = _event.data();
        const interestedLocums = data?.interestedLocums || [];
        return _event.ref.update({
          interestedLocums: _.uniq([...interestedLocums, uid]),
        });
      })
      .then(() => {
        resolve('ok');
      })
      .catch(e => {
        console.error('error', e);
        reject(e);
      });
  });
}

export function refuseLocum(event: Event, locum: Locum) {
  // add a modal on next time this locum opens the app saying 'hey the owner already found another locum, sorry'....
  return new Promise((resolve, reject) => {
    firestore()
      .collection('events')
      .doc(event.id)
      .get()
      .then(_event => {
        const data = _event.data();
        const refusedLocums = data?.refusedLocums || [];
        return _event.ref.update({
          refusedLocums: _.uniq([...refusedLocums, locum.id]),
        });
      })
      .then(() => {
        resolve('ok');
      })
      .catch(e => {
        console.error('error', e);
        reject(e);
      });
  });
}

export function acceptLocum(event: Event, locum: Locum) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('events')
      .doc(event.id)
      .get()
      .then(_event => {
        const data = _event.data();
        const interestedLocums = (data?.interestedLocums || []) as Locum[];
        const acceptedLocums = (data?.acceptedLocums || []) as Locum[];
        return _event.ref.update({
          interestedLocums: interestedLocums.filter(
            interestedLocum => interestedLocum.id !== locum.id,
          ),
          acceptedLocums: _.uniq([...acceptedLocums, locum.id]),
        });
      })
      .then(() => {
        resolve('ok');
      })
      .catch(e => {
        console.error('error', e);
        reject(e);
      });
  });
}
