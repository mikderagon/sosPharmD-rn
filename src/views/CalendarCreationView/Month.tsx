import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import { heightPercentageToDP as hp } from '../../shared/helpers/layout/responsiveLayout';
import { themeColors } from '../../shared/styles/colors';

const MONTHS_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'September',
  'Octobre',
  'Novembre',
  'Décembre',
];

export default ({ month, selectedDates, setSelectedDates }) => {
  // const _selectedDates = [1, 5, 6, 7, 9, 10, 11, 18, 19, 20];
  const [cursors, setCursors] = useState([]);

  const weekdayIndex = month.getDay();

  let firstRow = [0, 0, 0, 0, 0, 0, 0];
  firstRow[weekdayIndex] = 1;
  let j = 2;
  for (let i = weekdayIndex + 1; i < firstRow.length; i++) {
    firstRow[i] = j;
    j++;
  }

  let secondRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < secondRow.length; i++) {
    secondRow[i] = j;
    j++;
  }

  let thirdRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < thirdRow.length; i++) {
    thirdRow[i] = j;
    j++;
  }

  let fourthRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < fourthRow.length; i++) {
    fourthRow[i] = j;
    j++;
  }

  const lastDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  let fifthRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < fifthRow.length; i++) {
    fifthRow[i] = j;
    if (j === lastDayOfMonth) {
      j++;
      break;
    }
    j++;
  }

  let lastRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < lastRow.length; i++) {
    if (j > lastDayOfMonth) {
      break;
    }
    lastRow[i] = j;
    j++;
  }

  const hasSixthRow = lastRow.filter(n => n > 0).length > 0;

  let endPosition = hasSixthRow
    ? lastRow.length - lastRow.indexOf(0)
    : fifthRow.length -
      (fifthRow[fifthRow.length - 1] === 0
        ? fifthRow.indexOf(0)
        : fifthRow.indexOf(lastDayOfMonth) + 1);

  const getCursorPosition1 = rowNumber => {
    let row;
    switch (rowNumber) {
      case 1:
        row = firstRow;
        break;
      case 2:
        row = secondRow;
        break;
      case 3:
        row = thirdRow;
        break;
      case 4:
        row = fourthRow;
        break;
      case 5:
        row = fifthRow;
        break;
      case 6:
        row = lastRow;
        break;
      default:
        row = lastRow;
        break;
    }

    for (const n of row) {
      for (const d of selectedDates) {
        if (n === d) {
          return n;
        }
      }
    }
  };

  const getCursorPosition2 = rowNumber => {
    let row;
    switch (rowNumber) {
      case 1:
        row = firstRow;
        break;
      case 2:
        row = secondRow;
        break;
      case 3:
        row = thirdRow;
        break;
      case 4:
        row = fourthRow;
        break;
      case 5:
        row = fifthRow;
        break;
      case 6:
        row = lastRow;
        break;
      default:
        row = lastRow;
        break;
    }

    for (const n of row) {
      for (let d = selectedDates[selectedDates.length - 1]; d > 0; d--) {
        if (n === d) {
          return n;
        }
      }
    }
  };

  const getRowOfCursor = cursorPosition => {
    let i = 0;
    for (const row of [
      firstRow,
      secondRow,
      thirdRow,
      fourthRow,
      fifthRow,
      lastRow,
    ]) {
      i++;
      if (row[0] <= cursorPosition && row[row.length - 1] >= cursorPosition) {
        return i;
      }
    }
  };

  const formatKey = (row, cursor) => {
    return `${month.getFullYear()}-${
      month.getMonth() + 1
    }/row=${row}/cursor=${cursor}`;
  };

  const setCursorPosition1 = (rowNumber, position) => {
    const newDate = [formatKey(rowNumber, 1), position];
    setCursors([...cursors, ...newDate]);
  };

  const setCursorPosition2 = (rowNumber, position) => {
    const newDate = [formatKey(rowNumber, 2), position];
    setCursors([...cursors, ...newDate]);
  };

  console.log(cursors);

  return (
    <>
      <View style={styles.monthNameContainer}>
        <Text style={styles.monthName}>
          {MONTHS_FR[month.getMonth()]} {month.getFullYear()}
        </Text>
      </View>
      <CustomSlider
        {...{
          // ...defaultMonthProps,
          key: `${month}/${1}`,
          startPosition: weekdayIndex,
          labels: firstRow,
          // cursorPosition1: getCursorPosition1(1),
          // cursorPosition2: getCursorPosition2(1),
          fetchCursorPosition1: position => setCursorPosition1(1, position),
          fetchCursorPosition2: position => setCursorPosition2(1, position),
        }}
      />
      <CustomSlider
        {...{
          // ...defaultMonthProps,
          key: `${month}/${2}`,
          labels: secondRow,
          fetchCursorPosition1: position => setCursorPosition1(2, position),
          fetchCursorPosition2: position => setCursorPosition2(2, position),
        }}
      />
      <CustomSlider
        {...{
          // ...defaultMonthProps,
          key: `${month}/${3}`,
          labels: thirdRow,
          fetchCursorPosition1: position => setCursorPosition1(3, position),
          fetchCursorPosition2: position => setCursorPosition2(3, position),
        }}
      />
      <CustomSlider
        {...{
          // ...defaultMonthProps,
          key: `${month}/${4}`,
          labels: fourthRow,
          fetchCursorPosition1: position => setCursorPosition1(4, position),
          fetchCursorPosition2: position => setCursorPosition2(4, position),
        }}
      />
      <CustomSlider
        {...{
          // ...defaultMonthProps,
          key: `${month}/${5}`,
          labels: fifthRow,
          endPosition: hasSixthRow ? 0 : endPosition,
          fetchCursorPosition1: position => setCursorPosition1(5, position),
          fetchCursorPosition2: position => setCursorPosition2(5, position),
        }}
      />
      {hasSixthRow && (
        <CustomSlider
          {...{
            // ...defaultMonthProps,
            key: `${month}/${6}`,
            labels: lastRow,
            endPosition,
            fetchCursorPosition1: position => setCursorPosition1(6, position),
            fetchCursorPosition2: position => setCursorPosition2(6, position),
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  monthNameContainer: {
    backgroundColor: themeColors.accent2,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    marginBottom: hp(1),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  monthName: {
    color: themeColors.accent1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
