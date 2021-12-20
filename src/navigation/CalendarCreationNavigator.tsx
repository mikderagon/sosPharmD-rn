import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
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

  const [selectedDates, setSelectedDates] = useState([]);

  // console.log(selectedDates);

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
          setSelectedDates: addedDates => {
            console.log('add:', addedDates);
            setSelectedDates([...selectedDates, ...addedDates]);
          },
        }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
