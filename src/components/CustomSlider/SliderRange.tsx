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
  startPosition?: number;
  endPosition?: number;
  rowOfNumbers: number[];
}

export default ({
  startPosition = 0,
  endPosition = 0,
  rowOfNumbers,
}: CustomSliderProps) => {
  const [cursor1Position, setCursor1Position] = useState(null);
  const [cursor2Position, setCursor2Position] = useState(null);
  const handleCursor1Change = cursorIndex => {
    setCursor1Position(cursorIndex);
  };
  const handleCursor2Change = cursorIndex => {
    setCursor2Position(cursorIndex);
  };

  const x1 = new Value(startPosition);
  const x2 = new Value(startPosition);
  const [ranges, setRanges] = useState([]);
  const xvalues = [
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: min(x1, x2),
          right: 0,
          backgroundColor: colors.lightMain,
          width: add(max(add(x2, multiply(-1, x1)), 0), height),
          height,
          borderRadius: height / 2,
        }}
      />
      <Cursor
        size={height}
        {...{
          x: x1,
          count: rowOfNumbers.length,
          startPosition: rowOfNumbers[0],
          offsetIndex: startPosition,
          endIndex: endPosition,
        }}
        retrieveIndex={handleCursor1Change}
      />
      <Cursor
        size={height}
        {...{
          x: x2,
          count: rowOfNumbers.length,
          startPosition: rowOfNumbers[0],
          offsetIndex: startPosition,
          endIndex: endPosition,
        }}
        retrieveIndex={handleCursor2Change}
      />
    </>,
    ,
  ];

  const addRange = () => {
    setRanges([...ranges, xvalues[0]]);
    setCursor1Position(rowOfNumbers[0]);
    setCursor2Position(rowOfNumbers[0]);
  };
  return (
    <View style={styles.container}>
      {(ranges.length === 0 ||
        (cursor1Position > rowOfNumbers[0] &&
          cursor2Position > rowOfNumbers[0])) && (
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
