import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
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
import colors from '../../styles/colors';

const { Value, round, divide, concat, add, sub } = Animated;

interface CursorProps {
  x: Animated.Value<number>;
  size: number;
  count: number;
  initialIndex: number;
  offsetIndex: number;
}

export default ({ size, count, x, initialIndex, offsetIndex }: CursorProps) => {
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
    (count - 1) * size,
  );

  // const translateX = clamp(
  //   cond(
  //     eq(state, State.END),
  //     set(
  //       offset,
  //       timing({
  //         from: value,
  //         to: snapPoint(value, velocityX, snapPoints),
  //       }),
  //     ),
  //     value,
  //   ),
  //   0,
  //   (count - 1) * size,
  // );

  useCode(() => set(x, translateX), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.lightMain,
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
          style={{ fontSize: 24, color: colors.white }}
          text={concat(sub(add(index, initialIndex), offsetIndex - 1))}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
