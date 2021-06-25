/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useMemo } from 'react';
import { Animated } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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
}

const date_positions = [
  {
    date: 1,
    x: 45.5,
    y: 0,
  },
  {
    date: 2,
    x: 45.5 * 2,
    y: 0,
  },
  {
    date: 3,
    x: 45.5 * 3,
    y: 0,
  },
  {
    date: 4,
    x: 45.5 * 4,
    y: 0,
  },
  {
    date: 5,
    x: 45.5 * 5,
    y: 0,
  },
  {
    date: 6,
    x: 45.5 * 6,
    y: 0,
  },
  {
    date: 7,
    x: 45.5 * 0,
    y: 41,
  },
  {
    date: 8,
    x: 45.5 * 1,
    y: 41,
  },
  {
    date: 9,
    x: 45.5 * 2,
    y: 41,
  },
  {
    date: 10,
    x: 45.5 * 3,
    y: 41,
  },
  {
    date: 11,
    x: 45.5 * 4,
    y: 41,
  },
  {
    date: 12,
    x: 45.5 * 5,
    y: 41,
  },
  {
    date: 13,
    x: 45.5 * 6,
    y: 41,
  },
  {
    date: 14,
    x: 45.5 * 0,
    y: 82,
  },
  {
    date: 15,
    x: 45.5 * 1,
    y: 82,
  },
  {
    date: 16,
    x: 45.5 * 2,
    y: 82,
  },
  {
    date: 17,
    x: 45.5 * 3,
    y: 82,
  },
  {
    date: 18,
    x: 45.5 * 4,
    y: 82,
  },
  {
    date: 19,
    x: 45.5 * 5,
    y: 82,
  },
  {
    date: 20,
    x: 45.5 * 6,
    y: 82,
  },
  {
    date: 21,
    x: 45.5 * 0,
    y: 123,
  },
  {
    date: 22,
    x: 45.5 * 1,
    y: 123,
  },
  {
    date: 23,
    x: 45.5 * 2,
    y: 123,
  },
  {
    date: 24,
    x: 45.5 * 3,
    y: 123,
  },
  {
    date: 25,
    x: 45.5 * 4,
    y: 123,
  },
  {
    date: 26,
    x: 45.5 * 5,
    y: 123,
  },
  {
    date: 27,
    x: 45.5 * 6,
    y: 123,
  },
  {
    date: 28,
    x: 45.5 * 0,
    y: 164,
  },
  {
    date: 29,
    x: 45.5 * 1,
    y: 164,
  },
  {
    date: 30,
    x: 45.5 * 2,
    y: 164,
  },
  {
    date: 31,
    x: 45.5 * 3,
    y: 164,
  },
];

const Calendar = (props: Props) => {
  const getIndex = (event: number) => events.findIndex(e => e.date === event);
  const today = new Date().getDate();
  const { openCalendar, events, currentEvent, previousEvent } = props;
  const locumPosition = new Animated.Value(getIndex(previousEvent));
  useEffect(() => {
    Animated.timing(locumPosition, {
      toValue:
        previousEvent === events[events.length - 1].date
          ? events.length
          : getIndex(currentEvent),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentEvent]);
  const days_alpha = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysRow = days_alpha.map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  const days_num = [
    30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
  ];
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
                  // inputRange: [0, 1, 2, 3], // events.length + 1
                  inputRange: [...Array(events.length + 1).keys()],
                  // outputRange: [
                  //   // date_positions.filter(dp => dp.date === currentEvent).x,
                  //   // date_positions.filter(dp => dp.date === currentEvent).x,
                  //   date_positions.find(dp => dp.date === events[0].date).x,
                  //   date_positions.find(dp => dp.date === events[1].date).x,
                  //   date_positions.find(dp => dp.date === events[2].date).x,
                  //   date_positions.find(dp => dp.date === events[0].date).x, // initial again
                  // ],
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
                  // outputRange: [
                  //   date_positions.find(dp => dp.date === events[0].date).y,
                  //   date_positions.find(dp => dp.date === events[1].date).y,
                  //   date_positions.find(dp => dp.date === events[2].date).y,
                  //   date_positions.find(dp => dp.date === events[0].date).y,
                  // ],
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
        <Text style={styles.monthYear}>June 2021</Text>
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
