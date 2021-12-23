/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import auth from '@react-native-firebase/auth';
import React, { useContext, useRef, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import Navigator from './navigation/Navigator';
import { store } from './store';
import { StackParamList } from './navigation/types';
import * as firestore from './shared/server/firestore';
import { Locum, Owner } from './shared/models';
import { StatusBar } from 'react-native';

const AppRoot = () => {
  const { state, dispatch } = useContext(store);
  const [readyToMount, setReadyToMount] = useState(false);
  let initialRouteName = useRef('Home');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore.getUser(user).then(signedUser => {
          dispatch({
            type: 'SET_CURRENT_USER',
            currentUser: signedUser,
          });
          if (signedUser?.accountType === 'locum') {
            firestore.initLocumData(signedUser as Locum, dispatch);
          }
          if (signedUser?.accountType === 'owner') {
            firestore.initOwnerData(signedUser as Owner, dispatch);
          }
          initialRouteName.current = 'Home';
          setReadyToMount(true);
        });
      } else {
        setReadyToMount(true);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!readyToMount) {
    // data not rehydrated yet
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigator
        initialRouteName={initialRouteName.current as keyof StackParamList}
      />
    </>
  );
};

export default AppRoot;
