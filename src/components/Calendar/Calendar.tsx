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
import {
  CalendarState,
  weekdays_short,
  jours_semaines,
} from '../../utils/dates';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';
import { calendarDimensions } from '../Home/Calendar';
import { CELLS_COUNT, CELLS_COUNT_INCREASED } from '../Home/gridMeasurements';
import Cell from './Cells/Cell';
import * as dates from '../../utils/dates';
import { useContext } from 'react';
import { store } from '../../store';

interface Props {
  events: any;
  currentEvent?: number;
  previousEvent?: number;
  additionalRow: boolean;
  selectionState?: boolean;
  selectedDays: any;
  onDayPress: any;
  today: Date;
  calendarState: CalendarState;
}

const Calendar = (props: Props) => {
  const { state } = useContext(store);
  const {
    calendarState,
    today,
    additionalRow,
    events,
    selectionState,
    selectedDays,
    onDayPress,
  } = props;

  const daysRow = (
    state.language === 'fr' ? jours_semaines : weekdays_short
  ).map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));

  function getDaysList() {
    let list = new Array(additionalRow ? CELLS_COUNT_INCREASED : CELLS_COUNT);
    list[calendarState.firstWeekdayOfMonthIndex] = 1;
    for (let i = 2; i <= calendarState.monthLength; i++) {
      list[calendarState.firstWeekdayOfMonthIndex + i - 1] = i;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        list[i] = ' ';
      }
    }
    return list;
  }

  const daysGrid = getDaysList().map((day, index) => {
    const CELL_STATES = {
      selectedForNewEvent:
        selectionState &&
        selectedDays.find(
          selectedDay =>
            selectedDay.day === day &&
            selectedDay.month === calendarState.month &&
            selectedDay.year === calendarState.year,
        ),
      isToday:
        day === today.getDate() && calendarState.month === today.getMonth() + 1,
      isEvent: events.map(event => event.day).includes(day),
      interestedLocum: events
        .filter(event => event.interestedLocums.length)
        .map(event => event.day)
        .includes(day),
    };
    function _onDayPress() {
      onDayPress(day, calendarState.month, calendarState.year);
    }
    if (CELL_STATES.selectedForNewEvent) {
      return (
        <Cell key={index.toString()} onDayPress={_onDayPress}>
          <View style={styles.userSelectedHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
          </View>
        </Cell>
      );
    }
    if (CELL_STATES.isToday && CELL_STATES.interestedLocum) {
      return (
        <Cell key={index.toString()} onDayPress={_onDayPress}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
            <View style={styles.todayDot} />
          </View>
        </Cell>
      );
    }
    if (CELL_STATES.isToday && CELL_STATES.isEvent) {
      return (
        <Cell key={index.toString()} onDayPress={_onDayPress}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
            <View style={styles.todayDot} />
          </View>
        </Cell>
      );
    }
    if (CELL_STATES.isToday) {
      return (
        <Cell
          touchEnabled={selectionState}
          key={index.toString()}
          onDayPress={_onDayPress}>
          <View style={styles.todayHighlight}>
            <Text style={styles.highlightedDay}>{day}</Text>
          </View>
        </Cell>
      );
    }
    if (state.currentUser.accountType === 'locum' && CELL_STATES.isEvent) {
      return (
        <Cell key={index.toString()} onDayPress={_onDayPress}>
          <Text style={styles.day}>{day}</Text>
          <View style={styles.dayDot} />
        </Cell>
      );
    }
    if (
      state.currentUser.accountType === 'owner' &&
      CELL_STATES.interestedLocum
    ) {
      return (
        <Cell key={index.toString()} onDayPress={_onDayPress}>
          <Text style={styles.day}>{day}</Text>
          <View style={styles.dayDot} />
        </Cell>
      );
    }
    if (CELL_STATES.isEvent) {
      return (
        <Cell
          touchEnabled={selectionState}
          key={index.toString()}
          onDayPress={_onDayPress}>
          <Text style={styles.day}>{day}</Text>
          <View
            style={[styles.dayDot, { backgroundColor: colors.lightGray }]}
          />
        </Cell>
      );
    } else {
      return (
        <Cell
          touchEnabled={selectionState}
          key={index.toString()}
          onDayPress={_onDayPress}>
          <Text style={styles.day}>{day}</Text>
        </Cell>
      );
    }
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
          {state.language === 'fr'
            ? dates.mois[calendarState.month - 1]
            : calendarState.monthName}{' '}
          {calendarState.year}
        </Text>
      </View>

      <View style={styles.daysRow}>{daysRow}</View>
      <View style={styles.gridContainer}>{daysGrid}</View>
    </View>
  );
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
    backgroundColor: colors.main,
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
    backgroundColor: colors.main,
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
