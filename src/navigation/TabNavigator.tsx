import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import 'react-native-gesture-handler';
import CalendarNavigator from '../navigation/CalendarNavigator';
import colors, { themeColors } from '../shared/styles/colors';
import shadows from '../shared/styles/shadows';
import SettingsView from '../views/SettingsView/SettingsView';
import { StackParamList } from './types';

const Tab = createBottomTabNavigator();

const HomeIcon = require('../../assets/images/home.png');
const CalendarIcon = require('../../assets/images/calendar.png');
const UserIcon = require('../../assets/images/user.png');

interface Props {
  initialRouteName: keyof StackParamList;
}

type tabTypes = {
  imageSource: ImageSourcePropType;
};

type tabBarTypes = {
  Home: tabTypes;
  Calendrier: tabTypes;
  Profil: tabTypes;
};

const tabBarOptions: tabBarTypes = {
  Home: {
    imageSource: HomeIcon,
  },
  Calendrier: {
    imageSource: CalendarIcon,
  },
  Profil: {
    imageSource: UserIcon,
  },
};

const getTabBarIcon = ({ focused, route }) => {
  const focusedColor = themeColors.dark;
  const unfocusedColor = colors.lightGray;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
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
      tabBarOptions={{
        showLabel: false,
        style: { ...shadows.main, backgroundColor: themeColors.light },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon({ focused, route }),
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Calendrier"
        component={CalendarNavigator}
        options={({ route }) => ({
          tabBarVisible: getIsTabBarShown(route),
        })}
      />
      <Tab.Screen name="Profil" component={SettingsView} />
    </Tab.Navigator>
  );
};

export default Navigator;
