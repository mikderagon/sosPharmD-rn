/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { CalendarState, weekdays_short } from '../../utils/dates';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';
import { calendarDimensions } from '../Home/Calendar';

interface Props {
  events: any;
  currentEvent?: number;
  previousEvent?: number;
  additionalRow: boolean;
  selectionState?: boolean;
  selectedDays: any;
  onDayPress: any;
  state: CalendarState;
}

const Calendar = (props: Props) => {
  const today = new Date();
  const {
    state,
    additionalRow,
    events,
    selectionState,
    selectedDays,
    onDayPress,
  } = props;
  const daysRow = weekdays_short.map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  function createDaysList() {
    let list = new Array(additionalRow ? 42 : 35);
    list[state.firstWeekdayOfMonthIndex] = 1;
    for (let i = 2; i <= state.monthLength; i++) {
      list[state.firstWeekdayOfMonthIndex + i - 1] = i;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        list[i] = ' ';
      }
    }
    return list;
  }

  const days_num = createDaysList();
  const daysGrid = days_num.map((day, index) => {
    // 4 types of cells right, now TODO: simplify this function to one cell taking multiple styles
    const isSelectedForNewEvent =
      selectionState &&
      selectedDays.find(
        selectedDay =>
          selectedDay.day === day &&
          selectedDay.month === state.month &&
          selectedDay.year === state.year,
      );
    const isLocumNotif = events
      .filter(event => event.interestedLocums.length)
      .map(event => event.day)
      .includes(day);
    const isUserEvent = events.map(event => event.day).includes(day);
    if (isSelectedForNewEvent) {
      return (
        <TouchableOpacity
          style={styles.cell}
          key={index}
          onPress={() => {
            onDayPress(day, state.month, state.year);
          }}>
          <View style={styles.userSelectedHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (day === today.getDate() && isLocumNotif) {
      return (
        <TouchableOpacity
          style={styles.cell}
          key={index}
          onPress={() => {
            onDayPress(day, state.month, state.year);
          }}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
            <View style={styles.todayDot} />
          </View>
        </TouchableOpacity>
      );
    }
    if (day === today.getDate() && state.month === today.getMonth() + 1) {
      return (
        <TouchableOpacity
          style={styles.cell}
          key={index}
          onPress={() => {
            onDayPress(day, state.month, state.year);
          }}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (isLocumNotif) {
      return (
        <TouchableOpacity
          style={styles.cell}
          key={index}
          onPress={() => {
            onDayPress(day, state.month, state.year);
          }}>
          <Text style={styles.day}>{day}</Text>
          <View style={styles.dayDot} />
        </TouchableOpacity>
      );
    }
    if (isUserEvent) {
      return (
        <TouchableOpacity
          style={styles.cell}
          key={index}
          onPress={() => {
            onDayPress(day, state.month, state.year);
          }}>
          <Text style={styles.day}>{day}</Text>
          <View
            style={[styles.dayDot, { backgroundColor: colors.regularBlue }]}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.cell}
        key={index}
        onPress={() => {
          onDayPress(day, state.month, state.year);
        }}>
        <Text style={styles.day}>{day}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View
      style={[
        styles.container,
        {
          height: additionalRow
            ? styles.container.height + hp(5)
            : styles.container.height,
        },
      ]}>
      <View style={{ marginTop: hp(2.5) }}>
        <Text style={styles.monthYear}>
          {state.monthName} {state.year}
        </Text>
      </View>

      <View style={styles.daysRow}>{daysRow}</View>
      <View style={styles.gridContainer}>{daysGrid}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: hp(35),
    height: calendarDimensions.height,
    width: calendarDimensions.width,
    // width: wp(85),
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
  },
  monthYear: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
  },
  cell: {
    // height: hp(5),
    // width: hp(5),
    height: calendarDimensions.cell,
    width: calendarDimensions.cell,
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
  highlightedDay: {
    color: '#fff',
  },
  days: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 11,
  },
  daysRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateHighlight: {
    height: '60%',
    width: '60%',
    borderRadius: 50,
    backgroundColor: colors.regularBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locumHighlight: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayHighlight: {
    height: '80%',
    width: '80%',
    borderRadius: 50,
    backgroundColor: colors.regularBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSelectedHighlight: {
    height: '80%',
    width: '80%',
    borderRadius: 50,
    backgroundColor: colors.darkerBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDot: {
    position: 'absolute',
    bottom: 5,
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: 'green',
  },
  todayDot: {
    position: 'absolute',
    bottom: 3,
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

export default Calendar;
