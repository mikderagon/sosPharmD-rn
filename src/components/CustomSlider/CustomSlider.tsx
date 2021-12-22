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
        setSelectedDates({
          [`${month.toLocaleString().split(',')[0]}/${row}/${
            cursors.length + 1
          }`]: indexes[0],
          [`${month.toLocaleString().split(',')[0]}/${row}/${
            cursors.length + 2
          }`]: indexes[1],
        });
      }
    };

    const retrieveIndex2 = index => {
      indexes[1] = index;

      if (indexes.length === 2) {
        setSelectedDates({
          [`${month.toLocaleString().split(',')[0]}/${row}/${
            cursors.length + 1
          }`]: indexes[0],
          [`${month.toLocaleString().split(',')[0]}/${row}/${
            cursors.length + 2
          }`]: indexes[1],
        });
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
      <React.Fragment key={`${month}/${row}/${Math.random() * 10}`}>
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
      </React.Fragment>
    );
  };

  const addCursors = () => {
    setCursors([...cursors, getNewCursors()]);
  };

  return (
    <View style={styles.container}>
      {cursors.length < 1 && (
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
