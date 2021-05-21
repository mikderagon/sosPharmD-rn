/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  Calendar as _Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
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

const Calendar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <_Calendar
        theme={
          {
            // arrowColor: 'red',
          }
        }
      />

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
  );
};

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
});

export default Calendar;
