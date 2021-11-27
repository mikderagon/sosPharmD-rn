import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { calendarDimensions } from '../../Home/Calendar';

interface Props {
  onDayPress: () => void;
  children: any;
  touchEnabled?: boolean;
}

const Cell = ({ onDayPress, children, touchEnabled = true }: Props) =>
  touchEnabled ? (
    <TouchableOpacity style={styles.container} onPress={onDayPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>{children}</View>
  );

const styles = StyleSheet.create({
  container: {
    height: calendarDimensions.cell,
    width: calendarDimensions.cell,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cell;
