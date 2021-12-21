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
  const [cursorPosition1, setCursorPosition1] = useState(3);
  const [cursorPosition2, setCursorPosition2] = useState(4);

  const weekdayIndex = month.getDay();

  let firstRow = [0, 0, 0, 0, 0, 0, 0];
  firstRow[weekdayIndex] = 1;
  let j = 2;
  for (let i = weekdayIndex + 1; i < firstRow.length; i++) {
    firstRow[i] = j;
    j++;
  }

  return (
    <>
      <View style={styles.monthNameContainer}>
        <Text style={styles.monthName}>
          {MONTHS_FR[month.getMonth()]} {month.getFullYear()}
        </Text>
      </View>
      <CustomSlider
        x1={new Value(0)}
        x2={new Value(0)}
        cursorPosition1={cursorPosition1}
        cursorPosition2={cursorPosition2}
        setCursorPosition1={n => setCursorPosition1(n)}
        setCursorPosition2={n => setCursorPosition2(n)}
      />
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
