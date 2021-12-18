import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import CustomSlider from '../../components/CustomSlider/CustomSlider';

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
      <CustomSlider startPosition={weekdayIndex} rowOfNumbers={firstRow} />
      <CustomSlider rowOfNumbers={secondRow} />
      <CustomSlider rowOfNumbers={thirdRow} />
      <CustomSlider rowOfNumbers={fourthRow} />
      <CustomSlider rowOfNumbers={lastRow} {...{ endPosition }} />
    </>
  );
};
