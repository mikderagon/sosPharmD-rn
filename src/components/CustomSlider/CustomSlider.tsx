import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { themeColors } from '../../styles/colors';
import Cursor from './Cursor';
import FillerBar from './FillerBar';
import Labels from './Labels';

const { Value } = Animated;

const { width: sliderWidth } = Dimensions.get('window');

const weekLength = 7;
const count = weekLength;

const sliderHeight = sliderWidth / count;

const styles = StyleSheet.create({
  container: {
    width: sliderWidth,
    height: sliderHeight,
    borderRadius: sliderHeight / 2,
    backgroundColor: themeColors.dark,
  },
  button: {
    zIndex: 1,
    height: sliderHeight,
    width: sliderHeight,
    borderRadius: sliderHeight / 2,
    backgroundColor: 'transparent',
    borderColor: themeColors.light,
    borderWidth: 1,
    shadowColor: themeColors.light,
    shadowOpacity: 1,
    shadowOffset: { height: 2, width: 2 },
  },
});

export default ({
  month,
  row,
  labels,
  firstDay,
  startPosition = 0,
  endPosition = 0,
  selectedDates,
  setSelectedDates,
}) => {
  // components to render
  const [cursors, setCursors] = useState([]);

  const getNewCursors = () => {
    const x1 = new Value(0);
    const x2 = new Value(0);

    let indexes = [];

    const retrieveIndex1 = index => {
      indexes[0] = index;

      if (indexes.length === 2) {
        setSelectedDates([
          { month, row, cursor: cursors.length * 2 + 1, position: indexes[0] },
          { month, row, cursor: cursors.length * 2 + 2, position: indexes[1] },
        ]);
      }
    };

    const retrieveIndex2 = index => {
      indexes[1] = index;

      if (indexes.length === 2) {
        setSelectedDates([
          { month, row, cursor: cursors.length * 2 + 1, position: indexes[0] },
          { month, row, cursor: cursors.length * 2 + 2, position: indexes[1] },
        ]);
      }
    };

    const cursorProps = {
      size: sliderHeight,
      count: labels.length,
      startPosition: firstDay,
      offsetIndex: startPosition,
      endIndex: endPosition,
    };

    return (
      <>
        <FillerBar height={sliderHeight} x1={x1} x2={x2} />
        <Cursor
          {...{
            ...cursorProps,
            x: x1,
            fetchCursorPosition: position => retrieveIndex1(position),
          }}
        />
        <Cursor
          {...{
            ...cursorProps,
            x: x2,
            fetchCursorPosition: position => retrieveIndex2(position),
          }}
        />
      </>
    );
  };

  const addCursors = () => {
    setCursors([...cursors, getNewCursors()]);
  };

  return (
    <View style={styles.container}>
      {cursors.length < 3 &&
        selectedDates
          .filter(c => c.row === row && c.month === month)
          .filter(c => c.position > labels[0]).length ===
          cursors.length * 2 && (
          <TouchableOpacity
            style={[
              styles.button,
              {
                marginLeft: sliderHeight * startPosition,
              },
            ]}
            onPress={addCursors}
          />
        )}
      <Labels {...{ labels }} />
      {cursors}
    </View>
  );
};
