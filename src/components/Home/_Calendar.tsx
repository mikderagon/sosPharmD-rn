/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  Calendar as _Calendar,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import 'react-native-gesture-handler';
import AddButton from './AddButton';
import Locum from './Locum';

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const MOCK_DATA = [
  {
    firstName: 'Rick',
  },
  {
    firstName: 'Dave',
  },
  {
    firstName: 'Chad',
  },
  {
    firstName: 'Chad',
  },
  {
    firstName: 'Chad',
  },
  {
    firstName: 'Chad',
  },
];

const hoursOfDay = [
  {
    value: '0:00 AM',
  },
  {
    value: '1:00 AM',
  },
  {
    value: '2:00 AM',
  },
  {
    value: '3:00 AM',
  },
  {
    value: '4:00 AM',
  },
  {
    value: '5:00 AM',
  },
  {
    value: '6:00 AM',
  },
  {
    value: '7:00 AM',
  },
  {
    value: '8:00 AM',
  },
  {
    value: '9:00 AM',
  },
  {
    value: '10:00 AM',
  },
  {
    value: '11:00 AM',
  },
  {
    value: '12:00 PM',
  },
  {
    value: '1:00 PM',
  },
  {
    value: '2:00 PM',
  },
  {
    value: '3:00 PM',
  },
  {
    value: '4:00 PM',
  },
  {
    value: '5:00 PM',
  },
  {
    value: '6:00 PM',
  },
  {
    value: '7:00 PM',
  },
  {
    value: '8:00 PM',
  },
  {
    value: '9:00 PM',
  },
  {
    value: '10:00 PM',
  },
  {
    value: '11:00 PM',
  },
];

const Calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [tab, setTab] = useState(1);

  const onDayPress = data => {
    if (tab === 1) {
      setTab(2);
    }
    setSelectedDate(data.dateString);
    markDate(data.dateString);
  };

  function markDate(date) {
    const _markedDates = {};
    if (!_markedDates[date]) {
      _markedDates[date] = {};
    }
    _markedDates[date].selected = true;
    _markedDates[date].selectedColor = MAIN_COLOR;
    setMarkedDates(_markedDates);
  }

  return tab === 1 ? (
    <View style={styles.container}>
      <_Calendar markedDates={markedDates} onDayPress={onDayPress} />
      <View style={styles.addButtonContainer}>
        <View style={styles.addButtonPosition}>
          <AddButton />
        </View>
      </View>

      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={MOCK_DATA}
          renderItem={() => {
            return <Locum />;
          }}
          ItemSeparatorComponent={() => <View style={styles.locumSeparator} />}
          ListHeaderComponent={() => <View style={styles.flatListHeader} />}
          ListFooterComponent={() => <View style={styles.flatListFooter} />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  ) : (
    <View style={styles.container}>
      <Agenda
        markedDates={markedDates}
        selected={selectedDate}
        onDayPress={onDayPress}
        hideKnob
        renderEmptyData={() => {
          return (
            <FlatList
              data={hoursOfDay}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{ height: 40, width: '100%' }}>
                    <Text>{item.value}</Text>
                  </View>
                );
              }}
            />
          );
        }}
        items={{
          '2021-05-20': [
            { name: 'Vimont PJC', start: '0:00 AM', end: '8:00 AM' },
            { name: 'Vimont PJC' },
            { name: 'Vimont PJC' },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={styles.dayComponent}>
              <Text>{item.name}</Text>
              <Text>{item.start}</Text>
              <Text>{item.end}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const MAIN_COLOR = '#00BBF2';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  addButtonContainer: {
    zIndex: 1,
  },
  addButtonPosition: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -15,
    zIndex: 1,
  },
  flatListContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  locumSeparator: {
    height: 10,
  },
  flatListHeader: {
    height: 60,
  },
  flatListFooter: {
    height: 20,
  },
  dayComponent: {
    height: 200,
    width: 320,
    backgroundColor: '#ddd',
  },
});

export default Calendar;
