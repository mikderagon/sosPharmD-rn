import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
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

interface CursorProps {
  x: Animated.Value<number>;
  size: number;
  count: number;
  startPosition: number;
  endIndex: number;
  offsetIndex: number;
  retrieveIndex: (idx: number) => void;
}

export default ({
  size,
  count,
  x,
  startPosition,
  endIndex,
  offsetIndex,
  retrieveIndex,
}: CursorProps) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = round(divide(x, size));
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const offset = new Value(offsetIndex * size);
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
    return call([index], idx => {
      const val =
        idx[0] + startPosition - offsetIndex - (offsetIndex > 0 ? 1 : 0);
      retrieveIndex(val);
    });
  }, [index]);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: size,
          height: size,
          borderRadius: size / 2,
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
          transform: [{ translateX }],
        }}>
        <ReText
          style={{ fontSize: 24, color: themeColors.accent2 }}
          text={concat(
            sub(
              add(index, startPosition),
              offsetIndex - (offsetIndex > 0 ? 1 : 0),
            ),
          )}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
