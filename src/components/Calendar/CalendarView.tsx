/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useState } from 'react';
import { Image } from 'react-native';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { CalendarEvent, DateObject } from '../../interfaces';
import { store } from '../../store';
import colors from '../../styles/colors';
import * as dates from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import AddEventModal from './AddEventModal';
import Calendar from './Calendar';

const backCaret = require('../../assets/images/backCaret.png');

const CalendarView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionState, setSelectionState] = useState(false); // set true to test
  const toggleModalVisibility = () => setModalVisible(!modalVisible);
  const [userEvent, setUserEvent] = useState<CalendarEvent>();
  const [selectedDays, setSelectedDays] = useState<DateObject[]>([]);
  const { state, dispatch } = useContext(store);
  const { currentUser } = state;

  const today = new Date();
  let runningYear = today.getFullYear();
  let runningMonth = today.getMonth();
  const monthsList = dates.months.map(_ => {
    runningMonth++;
    if (runningMonth === 13) {
      runningMonth = 1;
      runningYear += 1;
    }

    return dates.getCalendarState(
      new Date(
        `${runningYear}-${
          runningMonth < 10 ? `0${runningMonth}` : runningMonth
        }-15`,
      ),
    );
  });

  function onDayPress(day: number, month: number, year: number) {
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
      let clickedEvent;
      state.events.forEach(event => {
        if (event.day === day && event.month === month && event.year === year) {
          clickedEvent = event;
        }
      });
      console.log(clickedEvent);
    }
  }

  function deployEvents() {
    setSelectionState(false);
    const formattedEvents = selectedDays.map(selectedDay => {
      return {
        id: 50,
        day: selectedDay.day,
        month: selectedDay.month,
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
    // clear selectedDays
    setSelectedDays([]);
  }

  function addCalendarEvent(event: CalendarEvent) {
    setUserEvent(event);
    Alert.alert('Click on the dates on the calendar that you want');
    setSelectionState(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ left: 30 }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => navigation.navigate('Home')}>
          <Image source={backCaret} style={styles.backCaret} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Calendar</Text>
        <View style={{ width: styles.backCaret.width }} />
      </View>
      <View style={[styles.flexRow, { marginTop: 5 }, styles.legend]}>
        <View style={styles.flexRow}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: colors.main, marginRight: 5 },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.main }]}>
            Fulfilled
          </Text>
        </View>
        <View style={[styles.flexRow, { marginLeft: 20 }]}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: colors.lightGray, marginRight: 5 },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.lightGray }]}>
            Unfulfilled
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <FlatList
          data={monthsList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
          }}
          renderItem={({ item, index }) => {
            return (
              <Calendar
                today={today}
                selectionState={selectionState}
                selectedDays={selectedDays}
                onDayPress={onDayPress}
                events={state.events.filter(
                  event =>
                    event.year === item.year && event.month === item.month,
                )}
                state={item}
                additionalRow={
                  (item.monthLength < 31 &&
                    item.firstWeekdayOfMonthIndex === 6) ||
                  (item.monthLength === 31 && item.firstWeekdayOfMonthIndex > 4)
                }
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 120 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (selectionState && selectedDays.length) {
              deployEvents();
            } else {
              toggleModalVisibility();
            }
          }}
          style={[
            styles.addButton,
            selectionState
              ? {
                  backgroundColor: '#fff',
                  borderColor: selectedDays.length ? colors.main : 'red',
                }
              : {},
          ]}>
          <Text
            style={[
              styles.addButtonText,
              selectionState
                ? { color: selectedDays.length ? colors.main : 'red' }
                : {},
            ]}>
            {selectionState
              ? selectedDays.length
                ? 'Done'
                : 'Cancel'
              : 'Add Event'}
          </Text>
        </TouchableOpacity>
      </View>

      <AddEventModal
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        addCalendarEvent={addCalendarEvent}
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backCaret: {
    width: 10,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#494949',
  },
  legend: {
    width: wp(100),
    justifyContent: 'center',
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
    // backgroundColor: colors.main,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOffset: { height: -1, width: 1 },
    shadowOpacity: 0.4,
  },
  addButton: {
    height: 50,
    width: 170,
    borderRadius: 50,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#F3E8E7',
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // shadowOffset: { height: 0, width: 0 },
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
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
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default CalendarView;
