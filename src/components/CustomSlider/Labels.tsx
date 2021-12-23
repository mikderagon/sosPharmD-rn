import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { themeColors } from '../../shared/styles/colors';

interface LabelProps {
  labels: number[];
}

export default ({ labels }: LabelProps) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {labels.map((e, i) => {
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
