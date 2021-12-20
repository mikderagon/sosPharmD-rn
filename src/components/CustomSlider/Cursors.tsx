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

interface CursorsProps {
  startPosition?: number;
  endPosition?: number;
  rowOfNumbers: number[];
}

export default ({
  startPosition = 0,
  endPosition = 0,
  rowOfNumbers,
}: CursorsProps) => {
  const [maxIndex, setMaxIndex] = useState(0);

  const v1 = new Value(startPosition);
  const v2 = new Value(startPosition);

  const retrieveIndex1 = index => {};

  const retrieveIndex2 = index => {
    console.log(index);
    setMaxIndex(index);
    renderCursors();
  };

  const [cursors, setCursors] = useState(null);

  useEffect(() => {
    renderCursors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCursors = () => {
    setCursors(
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: min(v1, v2),
            right: 0,
            backgroundColor: colors.lightMain,
            width: add(max(add(v2, multiply(-1, v1)), 0), height),
            height,
            borderRadius: height / 2,
          }}
        />
        <Cursor
          size={height}
          {...{
            x: v1,
            count: rowOfNumbers.length,
            startPosition: rowOfNumbers[0],
            offsetIndex: startPosition,
            endIndex: maxIndex || endPosition,
          }}
          retrieveIndex={retrieveIndex1}
        />
        <Cursor
          size={height}
          {...{
            x: v2,
            count: rowOfNumbers.length,
            startPosition: rowOfNumbers[0],
            offsetIndex: startPosition,
            endIndex: endPosition,
          }}
          retrieveIndex={retrieveIndex2}
        />
      </>,
    );
  };

  return cursors;
};
