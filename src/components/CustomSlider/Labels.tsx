import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface LabelProps {
  count: number;
}

export default ({ count }: LabelProps) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {new Array(count).fill(0).map((e, i) => {
        return (
          <View key={i} style={{ flex: 1 }}>
            <Animated.Text
              style={{ color: 'red', textAlign: 'center', fontSize: 24 }}>
              {`${i + 1}`}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};
