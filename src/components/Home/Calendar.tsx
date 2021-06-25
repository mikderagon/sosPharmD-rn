/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {}

const Calendar = (props: Props) => {
  const days_alpha = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysRow = days_alpha.map(day => (
    <View style={[styles.cell, { height: hp(2) }]}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  const days_num = [
    30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
  ];
  const daysGrid = days_num.map(day => (
    <View style={styles.cell}>
      <Text style={styles.day}>{day}</Text>
    </View>
  ));
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
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
});

export default Calendar;
