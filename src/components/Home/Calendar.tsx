/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { store } from '../../store';
import colors from '../../styles/colors';
import { CalendarState } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { date_positions } from './gridMeasurements';
import * as dates from '../../utils/dates';

interface Props {
  openCalendar?: () => {};
  events: number[];
  currentEvent: number;
  previousEvent: number;
  calendarState: CalendarState;
}

const Calendar = (props: Props) => {
  const { state } = useContext(store);
  const { openCalendar, currentEvent, previousEvent, events, calendarState } =
    props;

  const getIndex = (eventDate: number) =>
    events.findIndex(e => e === eventDate);

  // first item of events will be at cell # 'events[0].date' + 1
  function createCellsList() {
    let cells = [];
    cells.push(calendarState.firstWeekdayOfMonthIndex + events[0] - 1);
    for (let i = 1; i < events.length; i++) {
      cells.push(events[i] + calendarState.firstWeekdayOfMonthIndex - 1);
    }
    return cells;
  }
  const cellList = createCellsList();
  function mapToCell(n: number) {
    const index = events.findIndex(e => e === n);
    return cellList[index];
  }
  const locumPosition = new Animated.Value(getIndex(previousEvent));
  useEffect(() => {
    Animated.timing(locumPosition, {
      toValue:
        previousEvent === events[events.length - 1]
          ? events.length
          : getIndex(currentEvent),
      duration: 300,
      useNativeDriver: true,
    }).start();
  });
  const daysRow = (
    state.language === 'fr' ? dates.jours_semaines : dates.weekdays_short
  ).map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  function createDaysList() {
    // if monday then start at index1
    // if wednesday then start at index3,
    // etc. from sun 0 to sat 6
    let list = new Array(35);
    list[calendarState.firstWeekdayOfMonthIndex] = 1;
    for (let i = 2; i <= calendarState.monthLength; i++) {
      list[calendarState.firstWeekdayOfMonthIndex + i - 1] = i;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        list[i] = '';
      }
    }
    return list;
  }
  createDaysList();
  const days_num = createDaysList();
  const daysGrid = days_num.map((day, index) => {
    const isEvent = events.map(event => event.date).includes(day);
    if (day === calendarState.day && isEvent) {
      return (
        <View style={styles.cell} key={index}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
            <View style={styles.todayDot} />
          </View>
        </View>
      );
    }
    if (day === calendarState.day) {
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
  if (!events.length) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={openCalendar}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>
            {state.language === 'fr'
              ? dates.mois[calendarState.month - 1]
              : calendarState.monthName}{' '}
            {new Date().getFullYear()}
          </Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={openCalendar}>
      <Animated.View
        style={[
          styles.locumHighlight,
          {
            // left: 7.2,
            // top: 73
            left: calendarDimensions.cell * 0.18,
            top: calendarDimensions.height * 0.244,
            transform: [
              {
                translateX: locumPosition.interpolate({
                  inputRange: [...Array(events.length + 1).keys()],
                  outputRange: Array.from(
                    { length: events.length + 1 },
                    (_, i) =>
                      date_positions.find(dp => {
                        return (
                          dp.cell ===
                          mapToCell(events[i === events.length ? 0 : i])
                        );
                      }).x,
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
                          dp.cell ===
                          mapToCell(events[i === events.length ? 0 : i]),
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
          {state.language === 'fr'
            ? dates.mois[calendarState.month - 1]
            : calendarState.monthName}{' '}
          {new Date().getFullYear()}
        </Text>
      </View>

      <View style={styles.daysRow}>{daysRow}</View>
      <View style={styles.gridContainer}>{daysGrid}</View>
    </TouchableOpacity>
  );
};

const width = wp(95);
export const calendarDimensions = {
  height: width * 0.85,
  width,
  cell: width / 8,
};

const styles = StyleSheet.create({
  container: {
    height: calendarDimensions.height,
    width: calendarDimensions.width,
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
    height: calendarDimensions.cell,
    width: calendarDimensions.cell,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locumHighlight: {
    position: 'absolute',
    height: calendarDimensions.cell * 0.75,
    width: calendarDimensions.cell * 0.75,
    borderRadius: hp(50),
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayHighlight: {
    height: '80%',
    width: '80%',
    borderRadius: 50,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDot: {
    position: 'absolute',
    bottom: 5,
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: colors.main,
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
