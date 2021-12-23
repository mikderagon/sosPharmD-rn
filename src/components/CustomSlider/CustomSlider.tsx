import React, { useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { themeColors } from '../../shared/styles/colors';
import Cursor from './Cursor';
import FillerBar from './FillerBar';
import Labels from './Labels';

const { Value } = Animated;

const { width: sliderWidth } = Dimensions.get('window');

const weekLength = 7;
const count = weekLength;

const sliderHeight = sliderWidth / count;

export default ({
  // month,
  // row,
  labels,
  startPosition = 0,
  endPosition = 0,
  fetchCursorPosition1,
  fetchCursorPosition2,
  cursorPosition1,
  cursorPosition2,
}) => {
  // components to render
  const [cursors, setCursors] = useState([]);

  const x1 = new Value(0);
  const x2 = new Value(0);

  const getNewCursors = () => {
    const cursorProps = {
      size: sliderHeight,
      count: labels.length,
      offsetIndex: startPosition,
      endIndex: endPosition,
    };

    return (
      <React.Fragment key={`${Math.random() * 10}`}>
        <FillerBar height={sliderHeight} x1={x1} x2={x2} />
        <Cursor
          {...{
            ...cursorProps,
            x: x1,
            startPosition: cursorPosition1 || labels[0],
            fetchCursorPosition: position => fetchCursorPosition1(position),
          }}
        />
        <Cursor
          {...{
            ...cursorProps,
            x: x2,
            startPosition: cursorPosition2 || labels[0],
            fetchCursorPosition: position => fetchCursorPosition2(position),
          }}
        />
      </React.Fragment>
    );
  };

  const addCursors = () => {
    setCursors([getNewCursors()]);
  };

  return (
    <View style={styles.container}>
      {cursors.length === 0 && (
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
