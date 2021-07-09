/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from '../../utils/responsiveLayout';
import { locumSize } from './Locum';

interface Props {
  date?: number;
}

const CalendarEventTag = (props: Props) => {
  const {} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Text>Calendar Event Tag</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // unknown reason not being in center
    left: wp(-5),
    height: locumSize.height,
    width: locumSize.width,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CalendarEventTag;
