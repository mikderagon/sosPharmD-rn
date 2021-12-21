import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import colors from '../../styles/colors';

const { max, min, add, multiply } = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.lightMain,
  },
});

export default ({ x1, x2, height }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: min(x1, x2),
          width: add(max(add(x2, multiply(-1, x1)), 0), height),
          height,
          borderRadius: height / 2,
        },
      ]}
    />
  );
};
