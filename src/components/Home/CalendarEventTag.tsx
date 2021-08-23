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
import { locumSize } from './Owner/Locum';

interface Props {
  date?: number;
  type: 'locum' | 'owner';
}

const CalendarEventTag = (props: Props) => {
  const { type } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>
        {type === 'locum'
          ? 'Les contrats affichés par les propriétaires apparaîtront ici'
          : 'Les locums qui appliquent pour vos événements apparaîtront ici'}
      </Text>
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
    justifyContent: 'center',
  },
  text: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CalendarEventTag;
