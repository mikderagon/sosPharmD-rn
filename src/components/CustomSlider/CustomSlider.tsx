import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';
import colors from '../../styles/colors';
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
    backgroundColor: '#f1f2f6',
  },
});

interface CustomSliderProps {
  initial?: number;
  end?: number;
  rowOfNumbers: number[];
}

export default ({ initial = 0, end = 0, rowOfNumbers }: CustomSliderProps) => {
  const x1 = new Value(initial);
  const x2 = new Value(Math.max(initial, end));
  return (
    <View style={styles.container}>
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
      <Labels {...{ rowOfNumbers }} />
      <Cursor
        size={height}
        {...{
          x: x1,
          count: rowOfNumbers.length,
          initialIndex: rowOfNumbers[0],
          offsetIndex: initial,
        }}
      />
      <Cursor
        size={height}
        {...{
          x: x2,
          count: rowOfNumbers.length,
          initialIndex: rowOfNumbers[0],
          offsetIndex: initial,
        }}
      />
    </View>
  );
};