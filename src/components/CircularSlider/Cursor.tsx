import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import { Circle } from 'react-native-svg';
import colors from '../../styles/colors';

import { STROKE } from './constants';

const r = STROKE / 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
}

const Cursor = ({ pos }: CursorProps) => {
  const animatedProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    return {
      cx: x,
      cy: y,
      r,
    };
  });
  return <AnimatedCircle animatedProps={animatedProps} fill={colors.main} />;
};

export default Cursor;
