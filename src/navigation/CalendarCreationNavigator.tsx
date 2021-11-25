import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { store } from '../store';
import CalendarCreationView from '../views/CalendarCreationView/CalendarCreationView';
import CalendarView from '../views/CalendarView';
import CalendarWizard from '../views/CalendarWizard';

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
        name="Main"
        component={CalendarCreationView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalendarWizard"
        component={CalendarWizard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
