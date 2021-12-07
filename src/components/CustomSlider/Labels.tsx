import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import colors from '../../styles/colors';

interface LabelProps {
  rowOfNumbers: number[];
}

export default ({ rowOfNumbers }: LabelProps) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {rowOfNumbers.map((e, i) => {
        return (
          <View key={e} style={{ flex: 1 }}>
            <Animated.Text
              style={{
                color: colors.main,
                textAlign: 'center',
                fontSize: 24,
              }}>
              {e}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};
