import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import TopNavBar from '../../components/NavBar/TopNavBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import colors from '../../styles/colors';
import Month from './Month';

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  weekdaysContainer: {
    backgroundColor: colors.lightMain,
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
    color: colors.main,
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({ navigation }) => {
  const weekdays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((w, index) => (
    <View style={styles.weekday} key={`${index} ${w}`}>
      <Text style={styles.weekdayFont}>{w}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        onCreateCalendar={() => navigation.navigate('CalendarCreation')}
      />
      <View style={styles.weekdaysContainer}>{weekdays}</View>
    </View>
  );
};
