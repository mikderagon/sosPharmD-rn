import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { themeColors } from '../../styles/colors';

export default () => {
  const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(
    (w, index) => (
      <View style={styles.weekday} key={`${index} ${w}`}>
        <Text style={styles.weekdayFont}>{w}</Text>
      </View>
    ),
  );

  return <View style={styles.container}>{weekdays}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.light,
    height: hp(4),
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  weekday: {
    flex: 1,
    alignItems: 'center',
  },
  weekdayFont: {
    color: themeColors.dark,
  },
});
