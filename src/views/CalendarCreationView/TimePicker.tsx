import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { themeColors } from '../../styles/colors';

export default ({ time, toggle, label }) => {
  const toTimeFormat = (): string => {
    const hours = time.getHours();
    let minutes = time.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  return (
    <TouchableOpacity onPress={toggle} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.timer}>
        <Text style={styles.time}>{toTimeFormat()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: themeColors.accent1,
    fontSize: 14,
    fontWeight: '800',
  },
  timer: {
    marginLeft: wp(3),
    borderRadius: 5,
    height: hp(4.5),
    width: wp(27),
    backgroundColor: themeColors.accent1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
    color: themeColors.dark,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
