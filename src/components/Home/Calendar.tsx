/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  openCalendar: () => {};
  events: [
    {
      date: number;
      name: string;
    },
  ];
  currentEvent: number;
  previousEvent: number;
  currentMonth: string;
  firstDayOfMonth: string;
  firstDayOfMonthIndex: number;
  numberOfDaysInCurrentMonth: number;
}

const col_margin = 45.9;
const row_margin = 45;

const date_positions = [
  {
    date: 1,
    x: col_margin,
    y: 0,
  },
  {
    date: 2,
    x: col_margin * 2,
    y: 0,
  },
  {
    date: 3,
    x: col_margin * 3,
    y: 0,
  },
  {
    date: 4,
    x: col_margin * 4,
    y: 0,
  },
  {
    date: 5,
    x: col_margin * 5,
    y: 0,
  },
  {
    date: 6,
    x: col_margin * 6,
    y: 0,
  },
  {
    date: 7,
    x: col_margin * 0,
    y: row_margin,
  },
  {
    date: 8,
    x: col_margin * 1,
    y: row_margin,
  },
  {
    date: 9,
    x: col_margin * 2,
    y: row_margin,
  },
  {
    date: 10,
    x: col_margin * 3,
    y: row_margin,
  },
  {
    date: 11,
    x: col_margin * 4,
    y: row_margin,
  },
  {
    date: 12,
    x: col_margin * 5,
    y: row_margin,
  },
  {
    date: 13,
    x: col_margin * 6,
    y: row_margin,
  },
  {
    date: 14,
    x: col_margin * 0,
    y: 82,
  },
  {
    date: 15,
    x: col_margin * 1,
    y: 82,
  },
  {
    date: 16,
    x: col_margin * 2,
    y: 82,
  },
  {
    date: 17,
    x: col_margin * 3,
    y: 82,
  },
  {
    date: 18,
    x: col_margin * 4,
    y: 82,
  },
  {
    date: 19,
    x: col_margin * 5,
    y: 82,
  },
  {
    date: 20,
    x: col_margin * 6,
    y: 82,
  },
  {
    date: 21,
    x: col_margin * 0,
    y: 123,
  },
  {
    date: 22,
    x: col_margin * 1,
    y: 123,
  },
  {
    date: 23,
    x: col_margin * 2,
    y: 123,
  },
  {
    date: 24,
    x: col_margin * 3,
    y: 123,
  },
  {
    date: 25,
    x: col_margin * 4,
    y: 123,
  },
  {
    date: 26,
    x: col_margin * 5,
    y: 123,
  },
  {
    date: 27,
    x: col_margin * 6,
    y: 123,
  },
  {
    date: 28,
    x: col_margin * 0,
    y: 164,
  },
  {
    date: 29,
    x: col_margin * 1,
    y: 164,
  },
  {
    date: 30,
    x: col_margin * 2,
    y: 164,
  },
  {
    date: 31,
    x: col_margin * 3,
    y: 164,
  },
];

const Calendar = (props: Props) => {
  const getIndex = (event: number) => events.findIndex(e => e.date === event);
  const today = new Date().getDate();
  const {
    openCalendar,
    events,
    currentEvent,
    previousEvent,
    currentMonth,
    firstDayOfMonth,
    firstDayOfMonthIndex,
    numberOfDaysInCurrentMonth,
  } = props;
  const locumPosition = new Animated.Value(getIndex(previousEvent));
  useEffect(() => {
    Animated.timing(locumPosition, {
      toValue:
        previousEvent === events[events.length - 1].date
          ? events.length
          : getIndex(currentEvent),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentEvent]);
  const days_alpha = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysRow = days_alpha.map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  function createDaysList() {
    // if monday then start at index1
    // if wednesday then start at index3,
    // etc. from sun 0 to sat 6
    let list = new Array(35);
    list[firstDayOfMonthIndex] = 1;
    for (let i = 2; i <= numberOfDaysInCurrentMonth; i++) {
      list[firstDayOfMonthIndex + i - 1] = i;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        list[i] = ' ';
      }
    }
    return list;
  }
  createDaysList();
  const days_num = createDaysList();
  const daysGrid = days_num.map((day, index) => {
    const isEvent = events.map(event => event.date).includes(day);
    if (day === today && isEvent) {
      return (
        <View style={styles.cell} key={index}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
            <View style={styles.todayDot} />
          </View>
        </View>
      );
    }
    if (day === today) {
      return (
        <View style={styles.cell} key={index}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
          </View>
        </View>
      );
    }
    if (isEvent) {
      return (
        <View style={styles.cell} key={index}>
          <Text style={styles.day}>{day}</Text>
          <View style={styles.dayDot} />
        </View>
      );
    }
    return (
      <View style={styles.cell} key={index}>
        <Text style={styles.day}>{day}</Text>
      </View>
    );
  });
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={openCalendar}>
      <Animated.View
        style={[
          styles.locumHighlight,
          {
            left: 5.5,
            top: 74,
            transform: [
              {
                translateX: locumPosition.interpolate({
                  inputRange: [...Array(events.length + 1).keys()],
                  outputRange: Array.from(
                    { length: events.length + 1 },
                    (_, i) =>
                      date_positions.find(
                        dp =>
                          dp.date === events[i === events.length ? 0 : i].date,
                      ).x,
                  ),
                }),
              },
              {
                translateY: locumPosition.interpolate({
                  inputRange: [...Array(events.length + 1).keys()],
                  outputRange: Array.from(
                    { length: events.length + 1 },
                    (_, i) =>
                      date_positions.find(
                        dp =>
                          dp.date === events[i === events.length ? 0 : i].date,
                      ).y,
                  ),
                }),
              },
            ],
          },
        ]}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.monthYear}>
          {currentMonth} {new Date().getFullYear()}
        </Text>
      </View>

      <View style={styles.daysRow}>{daysRow}</View>
      <View style={styles.gridContainer}>{daysGrid}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(35),
    width: wp(85),
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
    justifyContent: 'space-around',
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
  dayDot: {
    position: 'absolute',
    bottom: 5,
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: colors.regularBlue,
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
