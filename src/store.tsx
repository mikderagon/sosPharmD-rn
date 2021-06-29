import React, { createContext, useReducer } from 'react';
import _ from 'underscore';

const users = require('./mockData/users.json');
const events = require('./mockData/events.json');

const initialState = {
  users,
  events,
  currentUser: users[1],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_CALENDAR_EVENTS':
        const newState = {
          ...state,
          events: [...state.events, ...action.events],
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
