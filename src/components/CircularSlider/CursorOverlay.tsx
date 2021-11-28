import React, { ComponentProps } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

import { STROKE } from './constants';

interface CursorOverlayProps {
  position: Animated.SharedValue<Vector>;
}

const CursorOverlay = ({ position, icon }: CursorOverlayProps) => {
  const style = useAnimatedStyle(() => {
    const { x, y } = position.value;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: STROKE,
      height: STROKE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        { translateX: x - STROKE / 2 },
        { translateY: y - STROKE / 2 },
      ],
    };
  });
  return <Animated.View style={style} />;
};

export default CursorOverlay;
