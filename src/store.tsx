import React, { createContext, useReducer } from 'react';

const userPicture =
  'https://i.guim.co.uk/img/media/852837afc22bfa78936b7b99ba0b6db03d877dda/0_1038_2816_2113/master/2816.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4781b085f86533dded353aa9badd0802';

const initialState = {
  events: [
    {
      month: 6,
      year: 2021,
      events: [
        {
          date: 2,
          user: {
            firstName: 'Melissa',
            lastName: 'Covery',
            picture: userPicture,
          },
        },
        {
          date: 8,
          user: {
            name: 'Guy Fieri',
            firstName: 'Guy',
            lastName: 'Fieri',
            picture: userPicture,
          },
        },
        {
          date: 12,
          user: {
            name: 'Melissa Covery',
            firstName: 'Matthew',
            lastName: 'Montgomery',
            picture: userPicture,
          },
        },
        {
          date: 17,
          user: {
            firstName: 'Erika',
            lastName: 'Poirier',
            picture: userPicture,
          },
        },
        {
          date: 19,
          user: {
            firstName: 'Steven',
            lastName: 'Doucet',
            picture: userPicture,
          },
        },
        {
          date: 20,
          user: {
            firstName: 'Sebastian',
            lastName: 'Vettel',
            picture: userPicture,
          },
        },
      ],
    },
    {
      month: 7,
      year: 2021,
      events: [
        {
          date: 22,
        },
        {
          date: 23,
        },
      ],
    },
    {
      month: 9,
      year: 2021,
      events: [
        {
          date: 2,
        },
        {
          date: 1,
        },
      ],
    },
  ],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_CALENDAR_EVENTS':
        const newState = {
          ...state,
          events: action.events,
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
