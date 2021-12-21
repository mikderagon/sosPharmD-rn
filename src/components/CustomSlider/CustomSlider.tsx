import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Cursor from './Cursor';
import Labels from './Labels';
import Filling from './Filling';

const { width: sliderWidth } = Dimensions.get('window');

const weekLength = 7;
const count = weekLength;

const sliderHeight = sliderWidth / count;

const styles = StyleSheet.create({
  container: {
    width: sliderWidth,
    height: sliderHeight,
    borderRadius: sliderHeight / 2,
    backgroundColor: '#f1f2f6',
  },
});

export default ({
  x1,
  x2,
  cursorPosition1,
  cursorPosition2,
  setCursorPosition1,
  setCursorPosition2,
}) => {
  const sliderStart = 0;
  const cursorProps = {
    size: sliderHeight,
    count,
    minPosition: sliderStart,
  };
  return (
    <View style={styles.container}>
      <Filling x1={x1} x2={x2} height={sliderHeight} />
      <Labels {...{ count }} />
      <Cursor
        {...{
          ...cursorProps,
          x: x1,
          initialPosition: cursorPosition1,
          fetchCursorPosition: position => setCursorPosition1(position),
        }}
      />
      <Cursor
        {...{
          ...cursorProps,
          x: x2,
          initialPosition: cursorPosition2,
          fetchCursorPosition: position => setCursorPosition2(position),
        }}
      />
    </View>
  );
};
