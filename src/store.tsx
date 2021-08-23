import React, { createContext, useReducer } from 'react';
import _ from 'underscore';
import firestore from '@react-native-firebase/firestore';
import { User, Event, Locum, Owner, Pharmacy, School } from './models';
import { DateObject } from './interfaces';

const initialState = {
  currentUser: {} as Locum | Owner,
  currentUserPharmacy: {} as Pharmacy,
  language: 'fr',
  locumTags: [],
  contracts: [],
  events: [] as Event[],
  thisMonthEvents: [],
  thisMonthEventDates: [],
  interestedLocums: [],
  pharmacies: [] as Pharmacy[],
  schools: [] as School[],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_CALENDAR_EVENTS':
        var newState = {
          ...state,
          events: action.events,
        };
        return newState;
      case 'SET_THIS_MONTH_EVENTS':
        var newState = {
          ...state,
          thisMonthEvents: action.thisMonthEvents,
        };
        return newState;
      case 'SET_THIS_MONTH_EVENT_DATES':
        var newState = {
          ...state,
          thisMonthEventDates: action.thisMonthEventDates,
        };
        return newState;
      case 'ADD_CALENDAR_EVENTS':
        var newState = {
          ...state,
          events: [...state.events, ...action.events],
        };
        return newState;
      case 'SET_LOCUM_TAGS':
        var newState = {
          ...state,
          locumTags: action.locumTags,
        };
        return newState;
      case 'SET_CONTRACTS':
        var newState = {
          ...state,
          contracts: action.contracts,
        };
        return newState;
      case 'SET_CURRENT_USER':
        var newState = {
          ...state,
          currentUser: action.currentUser,
        };
        return newState;
      case 'SET_CURRENT_USER_PHARMACY':
        var newState = {
          ...state,
          currentUserPharmacy: action.currentUserPharmacy,
        };
        return newState;
      case 'SET_APP_LANGUAGE':
        var newState = {
          ...state,
          language: action.language,
        };
        return newState;
      case 'SET_SCHOOLS':
        var newState = {
          ...state,
          schools: action.schools,
        };
        return newState;
      case 'SET_PHARMACIES':
        var newState = {
          ...state,
          pharmacies: action.pharmacies,
        };
        return newState;
      case 'SET_INTERESTED_LOCUMS':
        var newState = {
          ...state,
          interestedLocums: action.interestedLocums,
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
