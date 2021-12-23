import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import { store } from '../../store';

const CELLS_COUNT = 35;
const width = wp(95);
const calendarDimensions = {
  height: width * 0.85,
  width,
  cell: width / 8,
};

interface Props {}

const Calendar = (props: Props) => {
  const { state } = useContext(store);

  function getDaysList() {
    let list = new Array(CELLS_COUNT);
    list[0] = 1;
    for (let i = 2; i <= 31; i++) {
      list[2 + i - 1] = i;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        list[i] = ' ';
      }
    }
    return list;
  }

  const daysGrid = getDaysList().map((day, index) => {
    return (
      <TouchableOpacity key={index} style={styles.cell}>
        <Text style={styles.day}>{day}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={[styles.container]}>
      <View style={{ marginTop: hp(2.5) }}>
        <Text style={styles.monthYear}>Novembre 2021</Text>
      </View>

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
});

export default Calendar;
