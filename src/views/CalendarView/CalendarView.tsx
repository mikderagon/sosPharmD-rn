import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Calendar from './Calendar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import TopNavBar from '../../components/NavBar/TopNavBar';
import colors from '../../styles/colors';
import CustomSlider from '../../components/CustomSlider/CustomSlider';

const CalendarView = ({ navigation }) => {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        contentInset={{ bottom: hp(10) }}>
        <CustomSlider rowOfNumbers={[1, 2, 3, 4, 5, 6, 7]} />
        <CustomSlider rowOfNumbers={[8, 9, 10, 11, 12, 13, 14]} />
        <CustomSlider rowOfNumbers={[15, 16, 17, 18, 19, 20, 21]} />
        {/* <Calendar />
        <Calendar /> */}
      </ScrollView>
    </View>
  );
};

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

export default CalendarView;
