import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { store } from '../store';
import CalendarCreationView from '../views/CalendarCreationView';
import CalendarDateView from '../views/CalendarDateView';
import CalendarTimeView from '../views/CalendarTimeView';

const Stack = createStackNavigator();

interface Props {
  initialRouteName: string;
}

const Navigator = (props: Props) => {
  const { initialRouteName } = props;
  const { state, dispatch } = useContext(store);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarCreationView"
        component={CalendarCreationView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalendarTimeView"
        component={CalendarTimeView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalendarDateView"
        component={CalendarDateView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
