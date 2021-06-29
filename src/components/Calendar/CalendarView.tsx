/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Alert, Animated } from 'react-native';
import AddEventModal from './AddEventModal';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Modal from 'react-native-modal';
import Input from './Input';
import Calendar from './Calendar';
import { useContext } from 'react';
import { store } from '../../store';
import { useEffect } from 'react';
import { CalendarEvent } from '../../types';

// first month is the current month
const today = new Date();

function getFirstDayOfMonthIndex(year: number, monthIndex: number): number {
  return new Date(year, monthIndex, 1).getDay();
}

function getFirstDayOfMonth(year: number, monthIndex: number): string {
  const firstDayOfMonth = new Date(
    year,
    monthIndex, // 0 to 11
    1,
  )
    .toLocaleTimeString('en-US', {
      weekday: 'long',
      month: 'long',
    })
    .split(' ')[0];
  return firstDayOfMonth;
}

function getNumberOfDaysInMonth(year: number, monthIndex: number): number {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  let numberOfDaysInCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();
  // check if feb should have 29 days
  if (numberOfDaysInCurrentMonth === 28 && isLeapYear) {
    numberOfDaysInCurrentMonth = 29;
  }
  return numberOfDaysInCurrentMonth;
}

function getLongMonth(monthIndex: number): string {
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    monthIndex, // 0 to 11
    1,
  ).toLocaleTimeString('en-US', {
    weekday: 'long',
    month: 'long',
  });
  // .split(' ')[0];
  const currentMonth = firstDayOfMonth
    .split('(')[1]
    .split(':')[1]
    .split(')')[0]
    .trim();
  return currentMonth;
}
let runningYear = today.getFullYear();
const shownMonths = [...Array(12).keys()].map(m => {
  const firstDayIndex = getFirstDayOfMonthIndex(
    runningYear,
    today.getMonth() + m,
  );
  const firstDay = getFirstDayOfMonth(runningYear, today.getMonth() + m);
  const numberOfDays = getNumberOfDaysInMonth(
    runningYear,
    today.getMonth() + m,
  );
  const month = getLongMonth(today.getMonth() + m);
  if (month === 'January') {
    runningYear += 1;
  }
  return {
    month,
    monthIndex: today.getMonth() + m + 1,
    year: runningYear,
    firstDayIndex,
    firstDay,
    numberOfDays,
  };
});

const CalendarView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionState, setSelectionState] = useState(false); // set true to test
  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };
  const selectHours = () => {
    toggleModalVisibility();
  };
  const { state } = useContext(store);
  const [userEvent, setUserEvent] = useState<CalendarEvent>();

  interface DateObject {
    day: number;
    month: string;
    year: number;
  }

  const [selectedDays, setSelectedDays] = useState<DateObject[]>([]);

  function onDayPress(day: number, month: string, year: number) {
    if (selectionState) {
      if (
        selectedDays.find(
          selectedDay =>
            selectedDay.day === day &&
            selectedDay.month === month &&
            selectedDay.year === year,
        )
      ) {
        const index = selectedDays.findIndex(
          selectedDay =>
            selectedDay.day === day &&
            selectedDay.month === month &&
            selectedDay.year === year,
        );
        const newSelectedDays = selectedDays;
        newSelectedDays.splice(index, 1);
        setSelectedDays([...newSelectedDays]);
      } else {
        setSelectedDays([...selectedDays, { day, month, year }]);
      }
    }
  }

  function deployEvents() {
    console.log('will deploy:');
    console.log(userEvent);
    console.log('for these days:');
    console.log(selectedDays);
    setSelectionState(false);
    // create an animation to show that events have been set in the calendar,
    // which are now visible by the students
    // first find how we want to style the cells for days that have events (need to combine well with the 'student' notif dot)
  }

  function addCalendarEvent(event: CalendarEvent) {
    setUserEvent(event);
    // trigger event to alert the user to click on wanted dates on the calendars
    // this could be an animated view coming from the side...think creative
    // starting with a simple native alert to get the functionality done
    Alert.alert('Click on the dates on the calendar that you want');
    // then we need to record the clicked dates
    // we need to know that we're in this 'selection' state
    setSelectionState(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shownMonths}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ width: '100%', alignItems: 'center' }}
        renderItem={({ item, index }) => (
          <Calendar
            selectionState={selectionState}
            selectedDays={selectedDays}
            onDayPress={onDayPress}
            events={
              state.events.find(
                e => e.month === item.monthIndex && e.year === item.year,
              )
                ? state.events.find(
                    e => e.month === item.monthIndex && e.year === item.year,
                  ).events
                : []
            }
            currentMonth={getLongMonth(today.getMonth())}
            month={item.month}
            year={item.year}
            firstDayOfMonth={item.firstDay}
            firstDayOfMonthIndex={item.firstDayIndex}
            numberOfDaysInCurrentMonth={item.numberOfDays}
            additionalRow={
              (item.numberOfDays < 31 && item.firstDayIndex === 6) ||
              (item.numberOfDays === 31 && item.firstDayIndex > 4)
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={() => <View style={{ height: 70 }} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (selectionState) {
              deployEvents();
            } else {
              selectHours();
            }
          }}>
          <Text>{selectionState ? 'Deploy events' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <AddEventModal
        isVisible={modalVisible}
        toggleModal={toggleModalVisibility}
        addCalendarEvent={(event: CalendarEvent) => addCalendarEvent(event)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  monthYear: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
  },
  cell: {
    height: hp(5),
    width: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    color: '#494949',
  },
  days: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 11,
  },
  daysRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: hp(10),
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  modalView: {
    height: hp(60),
    width: wp(100),
    backgroundColor: '#898989',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    height: hp(5),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cancel: {
    color: '#f00',
    fontWeight: '300',
    fontSize: 15,
  },
  add: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default CalendarView;
