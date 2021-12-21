import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const { max, min, add, multiply } = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: 0,
    // right: 0,
    backgroundColor: '#bd536d',
  },
});

export default ({ x1, x2, height }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height,
          width: add(max(add(x2, multiply(-1, x1)), 0), height),
          borderRadius: height / 2,
          left: min(x1, x2),
        },
      ]}
    />
  );
};
