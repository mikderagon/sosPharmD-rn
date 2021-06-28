/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Animated } from 'react-native';
import {
  ScrollView,
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

const events = [{}];

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
    year: runningYear,
    firstDayIndex,
    firstDay,
    numberOfDays,
  };
});
console.log(shownMonths);

const CalendarView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectHours = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={shownMonths}
        contentContainerStyle={{ width: '100%', alignItems: 'center' }}
        renderItem={({ item, index }) => (
          <Calendar
            events={events}
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
            // if numberofdays is 30 or less: then add row only if firstday is saturday
            // if numberofdays is 31: then add row if firstday is fri or saturday.
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={() => <View style={{ height: 40 }} />}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
      {/* <ScrollView
        contentInset={{ top: hp(1), bottom: hp(1) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>
      </ScrollView> */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={selectHours}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>New Event</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Title" />
          </View>
          <Input set={() => {}} placeholder="Location" />
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Min. Experience" />
          </View>
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Starts" />
            <Input set={() => {}} placeholder="Ends" />
          </View>
        </View>
      </Modal>
    </View>
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
