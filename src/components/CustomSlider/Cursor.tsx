import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  call,
  cond,
  eq,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  clamp,
  onGestureEvent,
  ReText,
  snapPoint,
  timing,
} from 'react-native-redash';

const { Value, round, divide, concat, add } = Animated;

interface CursorProps {
  x: Animated.Value<number>;
  initialPosition: number; // 1 to 7
  minPosition?: number;
  maxPosition?: number;
  setMaxPosition?: (n: number) => void;
  size: number;
  count: number;
}

export default ({
  size,
  count,
  x,
  initialPosition = 0,
  minPosition,
  maxPosition,
  setMaxPosition,
}: CursorProps) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);

  const index = round(divide(x, size));

  const cursorLabel = concat(add(index, 1));

  const state = new Value(State.UNDETERMINED);

  const translationX = new Value(0);
  const velocityX = new Value(0);
  const offset = new Value(initialPosition * size);

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
    minPosition * size,
    (count - 1) * size,
  );

  useCode(() => set(x, translateX), [x, translateX]);

  useCode(() => {
    return call([x], i => {
      const n = Number(i);
      if (setMaxPosition) {
        console.log(Math.trunc(n / size + 1));
        // setMaxPosition();
      }
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
        <ReText style={{ fontSize: 24 }} text={cursorLabel} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
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
