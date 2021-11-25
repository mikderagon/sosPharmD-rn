import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { store } from '../store';
import colors from '../styles/colors';
import { StackParamList } from '../types';
import CalendarView from '../views/CalendarView';
import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';

import CalendarNavigator from '../navigation/CalendarNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<StackParamList>();

const HomeIcon = require('../../assets/images/HomeIcon.png');
const CalendarIcon = require('../../assets/images/CalendarIcon.png');
const UserIcon = require('../../assets/images/UserIcon.png');

interface Props {
  initialRouteName: keyof StackParamList;
}

type tabTypes = {
  imageSource: ImageSourcePropType;
};

type tabBarTypes = {
  Home: tabTypes;
  Calendar: tabTypes;
  Profile: tabTypes;
};

const tabBarOptions: tabBarTypes = {
  Home: {
    imageSource: HomeIcon,
  },
  Calendar: {
    imageSource: CalendarIcon,
  },
  Profile: {
    imageSource: UserIcon,
  },
};

const getTabBarIcon = ({ focused, route }) => {
  const focusedColor = colors.main;
  const unfocusedColor = colors.lightGray;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 2,
        bottom: -10,
      }}>
      <Image
        source={tabBarOptions[route.name as keyof tabBarTypes].imageSource}
        style={{
          tintColor: focused ? focusedColor : unfocusedColor,
          height: 25,
          maxWidth: 25,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          color: focused ? focusedColor : unfocusedColor,
          fontSize: 11,
          marginTop: 1,
        }}>
        {route.name}
      </Text>
    </View>
  );
};

const getIsTabBarShown = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'CalendarCreation':
      return false;
    default:
      return true;
  }
};

const Navigator = (props: Props) => {
  const { initialRouteName } = props;
  // const { state, dispatch } = useContext(store);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => getTabBarIcon({ focused, route }),
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={({ route }) => ({
          tabBarVisible: getIsTabBarShown(route),
        })}
      />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default Navigator;
