import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import colors from '../../../styles/colors';

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
} from '../constants';

import Label from './Label';

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightMain,
    borderRadius: 16,
    padding: PADDING,
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: PADDING,
    color: colors.main,
  },
});

const Container = ({ start, end, children }: ContainerProps) => {
  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    return formatDuration2(radToMinutes(d));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="DÉBUT" />
        <Label theta={end} label="FIN" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

export default Container;
