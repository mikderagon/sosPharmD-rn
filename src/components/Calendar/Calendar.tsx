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
  events?: [
    {
      date: number;
      name: string;
    },
  ];
  currentEvent?: number;
  previousEvent?: number;
  currentMonth: string;
  month: string;
  year: number;
  firstDayOfMonth: string;
  firstDayOfMonthIndex: number;
  numberOfDaysInCurrentMonth: number;
  additionalRow: boolean;
}

const days_alpha = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = (props: Props) => {
  const getIndex = (event: number) => events.findIndex(e => e.date === event);
  const today = new Date().getDate();
  const {
    additionalRow,
    events,
    currentEvent,
    previousEvent,
    month,
    currentMonth,
    year,
    firstDayOfMonth,
    firstDayOfMonthIndex,
    numberOfDaysInCurrentMonth,
  } = props;
  // console.log(events.map(e => e.date));
  // first item of events will be at cell # 'events[0].date' + 1
  function createCellsList() {
    let cells = [];
    cells.push(firstDayOfMonthIndex + events[0].date - 1);
    for (let i = 1; i < events.length; i++) {
      cells.push(events[i].date + 1);
    }
    return cells;
  }
  const daysRow = days_alpha.map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  function createDaysList() {
    let list = new Array(additionalRow ? 42 : 35);
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
    if (day === today && month === currentMonth) {
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
    <View
      style={[
        styles.container,
        {
          height: additionalRow
            ? styles.container.height + hp(5)
            : styles.container.height,
        },
      ]}>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.monthYear}>
          {month} {year}
        </Text>
      </View>

      <View style={styles.daysRow}>{daysRow}</View>
      <View style={styles.gridContainer}>{daysGrid}</View>
    </View>
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
