import React, { createContext, useReducer } from 'react';
import _ from 'underscore';

const users = require('./mockData/users.json');
const events = require('./mockData/events.json');

const initialState = {
  users,
  events,
  currentUser: users[1],
  language: 'french',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_CALENDAR_EVENTS':
        var newState = {
          ...state,
          events: [...state.events, ...action.events],
        };
        return newState;
      case 'SET_CURRENT_USER':
        var newState = {
          ...state,
          currentUser: action.currentUser,
        };
        return newState;
      case 'SET_APP_LANGUAGE':
        var newState = {
          ...state,
          language: action.language,
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };