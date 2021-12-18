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

  const [cursor3Position, setCursor3Position] = useState(null);
  const [cursor4Position, setCursor4Position] = useState(null);
  const handleCursor3Change = cursorIndex => {
    setCursor3Position(cursorIndex);
  };
  const handleCursor4Change = cursorIndex => {
    setCursor4Position(cursorIndex);
  };

  const [cursor5Position, setCursor5Position] = useState(null);
  const [cursor6Position, setCursor6Position] = useState(null);
  const handleCursor5Change = cursorIndex => {
    setCursor5Position(cursorIndex);
  };
  const handleCursor6Change = cursorIndex => {
    setCursor6Position(cursorIndex);
  };

  const x1 = new Value(startPosition);
  const x2 = new Value(startPosition);
  const x3 = new Value(startPosition);
  const x4 = new Value(startPosition);
  const x5 = new Value(startPosition);
  const x6 = new Value(startPosition);

  const [ranges, setRanges] = useState([]);

  const getCursors = (v1, v2, retrieveIndex1, retrieveIndex2) => {
    return (
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
            endIndex: endPosition,
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
      </>
    );
  };

  const xvalues = [
    getCursors(x1, x2, handleCursor1Change, handleCursor2Change),
    getCursors(x3, x4, handleCursor3Change, handleCursor4Change),
    getCursors(x5, x6, handleCursor5Change, handleCursor6Change),
  ];

  const addRange = () => {
    switch (ranges.length) {
      case 0: {
        setRanges([...ranges, xvalues[0]]);
        setCursor1Position(rowOfNumbers[0]);
        setCursor2Position(rowOfNumbers[0]);
        break;
      }
      case 1: {
        setRanges([...ranges, xvalues[1]]);
        setCursor3Position(rowOfNumbers[0]);
        setCursor4Position(rowOfNumbers[0]);
        break;
      }
      case 2: {
        setRanges([...ranges, xvalues[2]]);
        setCursor5Position(rowOfNumbers[0]);
        setCursor6Position(rowOfNumbers[0]);
        break;
      }
    }
  };

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
