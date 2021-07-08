/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect, memo } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { widthPercentageToDP as wp } from '../../utils/responsiveLayout';

interface Props {
  language: string;
}

const AnimatedTrail = (props: Props) => {
  const { language } = props;
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }),
        Animated.delay(400),
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.exp,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });
  return (
    <Animated.View
      style={[
        styles.customUnderline,
        {
          width: language === 'fr' ? wp(50) : wp(40),
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [-300, 0, 400],
              }),
            },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  customUnderline: {
    marginTop: 3,
    height: 2,
    width: wp(40),
    backgroundColor: colors.darkerBlue,
  },
});

export default memo(AnimatedTrail);
