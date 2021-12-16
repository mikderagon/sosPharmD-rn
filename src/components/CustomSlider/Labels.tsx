import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { themeColors } from '../../styles/colors';

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
          <View key={i} style={{ flex: 1 }}>
            {e > 0 && (
              <Animated.Text
                style={{
                  color: themeColors.accent1,
                  textAlign: 'center',
                  fontSize: 24,
                }}>
                {e}
              </Animated.Text>
            )}
          </View>
        );
      })}
    </View>
  );
};
