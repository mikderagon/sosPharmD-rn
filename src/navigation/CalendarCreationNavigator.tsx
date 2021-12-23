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

  const [selectedDates, setSelectedDates] = useState({});

  // console.log(selectedDates);

  const addDates = addedDates => {
    setSelectedDates(_selectedDates => {
      return { ..._selectedDates, ...addedDates };
    });
  };

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="CalendarCreationView"
        component={CalendarCreationView}
        options={{ headerShown: false }}
        initialParams={{
          selectedDates,
          setSelectedDates: dates => addDates(dates),
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
