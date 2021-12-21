import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  call,
  cond,
  Easing,
  eq,
  set,
  useCode,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  clamp,
  onGestureEvent,
  ReText,
  snapPoint,
  timing,
} from 'react-native-redash';
import colors, { themeColors } from '../../styles/colors';

const { Value, round, divide, concat, add, sub } = Animated;

export default ({
  x,
  size,
  count,
  startPosition,
  endIndex,
  offsetIndex,
  fetchCursorPosition,
}) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);

  const index = round(divide(x, size));

  const cursorLabel = concat(
    sub(add(index, startPosition), offsetIndex - (offsetIndex ? 1 : 0)),
  );

  const state = new Value(State.UNDETERMINED);

  const translationX = new Value(0);
  const velocityX = new Value(0);
  const offset = new Value(offsetIndex * size);

  const gestureHandler = onGestureEvent({ state, translationX, velocityX });

  const value = add(offset, translationX);

  const translateX = clamp(
    cond(
      eq(state, State.END),
      set(
        offset,
        timing({
          from: value,
          to: snapPoint(value, velocityX, snapPoints),
        }),
      ),
      value,
    ),
    offsetIndex * size,
    (count - 1) * size - endIndex * size,
  );

  useCode(() => set(x, translateX), []);

  useCode(() => {
    return call([x], i => {
      const n = Math.trunc(Number(i) / size);
      fetchCursorPosition(n);
    });
  }, [x]);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ translateX: x }],
          },
        ]}>
        <ReText
          style={{ fontSize: 24, color: themeColors.accent1 }}
          text={cursorLabel}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeColors.light,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
