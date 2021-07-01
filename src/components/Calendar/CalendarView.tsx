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
import { CalendarEvent } from '../../interfaces';
import * as dates from '../../utils/dates';
import colors from '../../styles/colors';

export interface DateObject {
  day: number;
  month: string;
  year: number;
}

const CalendarView = () => {
  const { state, dispatch } = useContext(store);
  const { currentUser } = state;

  const today = new Date();
  let runningYear = today.getFullYear();
  let runningMonth = today.getMonth();
  const _monthsList = dates.months.map(m => {
    runningMonth++;
    if (runningMonth === 13) {
      runningMonth = 1;
      runningYear += 1;
    }
    const {
      month,
      monthName,
      firstWeekdayOfMonthIndex,
      firstWeekdayOfMonth,
      monthLength,
    } = dates.getCalendarState(
      new Date(
        `${runningYear}-${
          runningMonth < 10 ? `0${runningMonth}` : runningMonth
        }-15`,
      ),
    );

    return {
      month,
      monthName,
      year: runningYear,
      firstWeekdayOfMonthIndex,
      firstWeekdayOfMonth,
      monthLength,
    };
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectionState, setSelectionState] = useState(false); // set true to test
  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };
  const selectHours = () => {
    toggleModalVisibility();
  };
  const [userEvent, setUserEvent] = useState<CalendarEvent>();

  const [selectedDays, setSelectedDays] = useState<DateObject[]>([]);

  const [editedEvent, setEditedEvent] = useState<CalendarEvent & DateObject>();

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
    } else {
      // if the day clicked has an event (userevent)
      // check if array of events include it
      // console.log(state.events);
      // console.log(
      //   state.events.includes(
      //     event =>
      //       event.day === day && event.month === month && event.year === year,
      //   ),
      // );
      setEditedEvent({
        title: userEvent?.title,
        location: userEvent?.location,
        minExperience: userEvent?.minExperience,
        startTime: userEvent?.startTime,
        endTime: userEvent?.endTime,
        day,
        month,
        year,
      });
      setModalVisible(true);
    }
  }

  function deployEvents() {
    setSelectionState(false);
    // create an animation to show that events have been set in the calendar,
    // which are now visible by the students
    // first find how we want to style the cells for days that have events (need to combine well with the 'student' notif dot)
    const formattedEvents = selectedDays.map(selectedDay => {
      return {
        id: 50,
        day: selectedDay.day,
        month: dates.getMonthIndex(selectedDay.month),
        year: selectedDay.year,
        userId: currentUser.id,
        title: userEvent?.title,
        startTime: userEvent?.startTime,
        endTime: userEvent?.endTime,
        interestedLocums: [],
        acceptedLocums: [],
      };
    });
    dispatch({
      type: 'ADD_CALENDAR_EVENTS',
      events: formattedEvents,
    });
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={[styles.flexRow, { marginTop: 5 }]}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: 'green', marginRight: 5 },
              ]}
            />
            <Text style={[styles.legendText, { color: 'green' }]}>
              Fulfilled
            </Text>
          </View>
          <View style={[styles.flexRow, { marginLeft: 20 }]}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: colors.regularBlue, marginRight: 5 },
              ]}
            />
            <Text style={[styles.legendText, { color: colors.regularBlue }]}>
              Unfulfilled
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={_monthsList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
          }}
          renderItem={({ item, index }) => {
            return (
              <Calendar
                selectionState={selectionState}
                selectedDays={selectedDays}
                onDayPress={onDayPress}
                events={state.events.filter(event => {
                  return event.year === item.year && event.month === item.month;
                })}
                state={item}
                additionalRow={
                  (item.numberOfDays < 31 && item.firstDayIndex === 6) ||
                  (item.numberOfDays === 31 && item.firstDayIndex > 4)
                }
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (selectionState) {
              deployEvents();
            } else {
              selectHours();
            }
          }}
          style={[styles.addButton, { marginTop: -15 }]}>
          <Text style={styles.addButtonText}>{selectionState ? '✔' : '+'}</Text>
        </TouchableOpacity>
      </View>

      <AddEventModal
        isVisible={modalVisible}
        event={editedEvent}
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
  header: {
    height: hp(5),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#494949',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    height: 7,
    width: 7,
    borderRadius: 50,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '400',
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
    backgroundColor: colors.regularBlue,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.darkerBlue,
    borderWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 1,
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
  addButtonText: {
    color: '#494949',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default CalendarView;
