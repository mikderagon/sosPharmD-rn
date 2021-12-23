import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import 'react-native-gesture-handler';
import CalendarCreationNavigator from '../navigation/CalendarCreationNavigator';
import { store } from '../store';
import CalendarCreationView from '../views/CalendarCreationView';
import CalendarView from '../views/CalendarView';

const Stack = createStackNavigator();

interface Props {
  initialRouteName: string;
}

const Navigator = (props: Props) => {
  const { initialRouteName } = props;
  const { state, dispatch } = useContext(store);

  const [selectedDates, setSelectedDates] = useState({});

  // console.log(selectedDates);

  const addDates = addedDates => {
    setSelectedDates(_selectedDates => {
      return { ..._selectedDates, ...addedDates };
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalendarCreation"
        component={CalendarCreationView}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialParams={{
          selectedDates,
          setSelectedDates: dates => addDates(dates),
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
