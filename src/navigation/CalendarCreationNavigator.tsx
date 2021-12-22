import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import 'react-native-gesture-handler';
import _ from 'underscore';
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

  const [selectedDates, setSelectedDates] = useState([]);

  // console.log(selectedDates);

  const addDates = addedDates => {
    setSelectedDates(_selectedDates => {
      const dupes = _selectedDates.filter(
        date =>
          date.month === addedDates[0].month &&
          date.row === addedDates[0].row &&
          addedDates.map(a => a.cursor).includes(date.cursor),
      );
      const dupeSet = JSON.stringify(dupes);
      console.log(dupeSet);
      return [..._selectedDates, ...addedDates];
    });
  };

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
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
        initialParams={{
          selectedDates,
          setSelectedDates: dates => addDates(dates),
        }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
