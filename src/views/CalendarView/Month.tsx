import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
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

export default ({ month }) => {
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

  let lastDayOfMonth = 31;
  let lastRow = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < lastRow.length; i++) {
    lastRow[i] = j;
    if (j === lastDayOfMonth) {
      break;
    }
    j++;
  }

  let endPosition = lastRow.length - lastRow.indexOf(0);

  return (
    <>
      <View style={styles.monthNameContainer}>
        <Text style={styles.monthName}>
          {MONTHS_FR[month.getMonth()]} {month.getFullYear()}
        </Text>
      </View>
      <CustomSlider startPosition={weekdayIndex} rowOfNumbers={firstRow} />
      <CustomSlider rowOfNumbers={secondRow} />
      <CustomSlider rowOfNumbers={thirdRow} />
      <CustomSlider rowOfNumbers={fourthRow} />
      <CustomSlider rowOfNumbers={lastRow} {...{ endPosition }} />
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
