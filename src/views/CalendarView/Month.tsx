import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import { heightPercentageToDP as hp } from '../../helpers/layout/responsiveLayout';
import { themeColors } from '../../styles/colors';

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
  // const [cursorPositions, setCursorPositions] = useState([]);

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

  return (
    <>
      <View style={styles.monthNameContainer}>
        <Text style={styles.monthName}>
          {MONTHS_FR[month.getMonth()]} {month.getFullYear()}
        </Text>
      </View>
      <CustomSlider
        row={1}
        {...{
          month,
          cursorPositions: selectedDates,
          setCursorPositions: addedCursors => setSelectedDates(addedCursors),
        }}
        startPosition={weekdayIndex}
        rowOfNumbers={firstRow}
      />
      <CustomSlider
        row={2}
        {...{
          month,
          cursorPositions: selectedDates,
          setCursorPositions: addedCursors => setSelectedDates(addedCursors),
        }}
        rowOfNumbers={secondRow}
      />
      <CustomSlider
        row={3}
        {...{
          month,
          cursorPositions: selectedDates,
          setCursorPositions: addedCursors => setSelectedDates(addedCursors),
        }}
        rowOfNumbers={thirdRow}
      />
      <CustomSlider
        row={4}
        {...{
          month,
          cursorPositions: selectedDates,
          setCursorPositions: addedCursors => setSelectedDates(addedCursors),
        }}
        rowOfNumbers={fourthRow}
      />
      <CustomSlider
        row={5}
        rowOfNumbers={fifthRow}
        {...{
          month,
          cursorPositions: selectedDates,
          setCursorPositions: addedCursors => setSelectedDates(addedCursors),
          endPosition: hasSixthRow ? 0 : endPosition,
        }}
      />
      {hasSixthRow && (
        <CustomSlider
          row={6}
          rowOfNumbers={lastRow}
          {...{
            month,
            cursorPositions: selectedDates,
            setCursorPositions: addedCursors => setSelectedDates(addedCursors),
            endPosition,
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
