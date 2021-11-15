/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { store } from '../store';
import colors from '../styles/colors';
import { StackParamList } from '../types';
import CalendarView from '../views/CalendarView';
import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';

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
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
      }}>
      <Image
        source={tabBarOptions[route.name as keyof tabBarTypes].imageSource}
        style={{
          tintColor: focused ? focusedColor : unfocusedColor,
          height: 30,
          maxWidth: 30,
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

const Navigator = (props: Props) => {
  const { initialRouteName } = props;
  const { state, dispatch } = useContext(store);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => getTabBarIcon({ focused, route }),
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Calendar" component={CalendarView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default Navigator;
