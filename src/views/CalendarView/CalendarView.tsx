import React from 'react';
import {
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { NavigationProps } from '../../types';

const CalendarView = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={[styles.headerText, { opacity: 0 }]}>Create</Text>
          <Text style={styles.headerText}>Calendars</Text>
          <Text style={styles.headerTextRed}>Create</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        contentInset={{ bottom: hp(10) }}>
        <View style={styles.calendar}>
          <Text>Calendar 1</Text>
        </View>

        <View style={styles.calendar}>
          <Text>Calendar 2</Text>
        </View>

        <View style={styles.calendar}>
          <Text>Calendar 3</Text>
        </View>

        <View style={styles.calendar}>
          <Text>Calendar 4</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  header: {
    height: hp(9),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    marginVertical: hp(2),
    height: 200,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  headerInner: {
    marginBottom: hp(1),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 13,
    color: '#494949',
    fontWeight: '500',
  },
  headerTextRed: {
    fontSize: 12,
    color: 'red',
    fontWeight: '300',
  },
});

export default CalendarView;
