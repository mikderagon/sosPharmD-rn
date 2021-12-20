import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';
import colors, { themeColors } from '../../styles/colors';
import Cursor from './Cursor';
import Cursors from './Cursors';
import Labels from './Labels';

const { Value, max, min, add } = Animated;

const { width: totalWidth } = Dimensions.get('window');
const count = 7;
const width = totalWidth / count;
const height = width;
const styles = StyleSheet.create({
  container: {
    width: totalWidth,
    height,
    borderRadius: height / 2,
    backgroundColor: themeColors.dark,
  },
});

interface CustomSliderProps {
  row: number;
  startPosition?: number;
  endPosition?: number;
  rowOfNumbers: number[];
  cursorPositions: any[];
  setCursorPositions: (data) => void;
}

export default ({
  month,
  row,
  startPosition = 0,
  endPosition = 0,
  rowOfNumbers,
  cursorPositions,
  setCursorPositions,
}: CustomSliderProps) => {
  const [cursors, setCursors] = useState([]);

  const getNewCursors = () => {
    const c1 = new Value(startPosition);
    const c2 = new Value(startPosition);

    let indexes = [];

    const retrieveIndex1 = index => {
      indexes[0] = index;

      if (indexes.length === 2) {
        setCursorPositions([
          { month, row, cursor: cursors.length * 2 + 1, position: indexes[0] },
          { month, row, cursor: cursors.length * 2 + 2, position: indexes[1] },
        ]);
      }
    };

    const retrieveIndex2 = index => {
      indexes[1] = index;

      if (indexes.length === 2) {
        setCursorPositions([
          { month, row, cursor: cursors.length * 2 + 1, position: indexes[0] },
          { month, row, cursor: cursors.length * 2 + 2, position: indexes[1] },
        ]);
      }
    };

    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: min(c1, c2),
            right: 0,
            backgroundColor: colors.lightMain,
            width: add(max(add(c2, multiply(-1, c1)), 0), height),
            height,
            borderRadius: height / 2,
          }}
        />
        <Cursor
          size={height}
          {...{
            x: c1,
            count: rowOfNumbers.length,
            startPosition: rowOfNumbers[0],
            offsetIndex: startPosition,
            endIndex: endPosition,
          }}
          retrieveIndex={retrieveIndex1}
        />
        <Cursor
          size={height}
          {...{
            x: c2,
            count: rowOfNumbers.length,
            startPosition: rowOfNumbers[0],
            offsetIndex: startPosition,
            endIndex: endPosition,
          }}
          retrieveIndex={retrieveIndex2}
        />
      </>
    );
  };

  const addCursors = () => {
    setCursors([...cursors, getNewCursors()]);
  };

  console.log(cursorPositions);

  return (
    <View style={styles.container}>
      {cursors.length < 3 &&
        cursorPositions
          .filter(c => c.row === row && c.month === month)
          .filter(c => c.position > rowOfNumbers[0]).length ===
          cursors.length * 2 && (
          <TouchableOpacity
            style={{
              marginLeft: startPosition * width,
              zIndex: 1,
              height,
              width,
              backgroundColor: 'transparent',
            }}
            onPress={addCursors}
          />
        )}
      <Labels {...{ rowOfNumbers }} />
      {cursors}
    </View>
  );

  return (
    <View style={styles.container}>
      {ranges.length < 3 &&
        [
          cursor1Position,
          cursor2Position,
          cursor3Position,
          cursor4Position,
          cursor5Position,
          cursor6Position,
        ]
          .filter(c => c)
          .filter(c => c > rowOfNumbers[0]).length ===
          ranges.length * 2 && (
          <TouchableOpacity
            style={{
              marginLeft: startPosition * width,
              zIndex: 1,
              height,
              width,
              backgroundColor: 'transparent',
            }}
            onPress={addRange}
          />
        )}
      <Labels {...{ rowOfNumbers }} />
      {ranges}
    </View>
  );
};
