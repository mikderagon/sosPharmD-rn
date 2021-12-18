import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { Input } from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import colors, { themeColors } from '../../styles/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Month from '../CalendarView/Month';
import TopNavBar from '../../components/NavBar/TopNavBar';
import NextButton from '../../components/Button/LoginButton';

type Gender = 'm' | 'f';

const BackCaret = require('../../../assets/images/backCaret.png');
const PharmacistFemale = require('../../../assets/images/pharmacist_female.png');
const PharmacistMale = require('../../../assets/images/pharmacist_male.png');
const Clock = require('../../../assets/images/clock.png');

const CalendarDateView = ({ navigation }) => {
  const weekdays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((w, index) => (
    <View style={styles.weekday} key={`${index} ${w}`}>
      <Text style={styles.weekdayFont}>{w}</Text>
    </View>
  ));

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  const [selectedPharmacist, setSelectedPharmacist] =
    useState<Gender>(undefined);

  const confirmStartTime = (time: Date) => {
    setStartTimeVisible(false);
    setStartTime(time);
  };

  const confirmEndTime = (time: Date) => {
    setEndTimeVisible(false);
    setEndTime(time);
  };

  const cancelStartTime = () => {
    setStartTimeVisible(false);
  };

  const cancelEndTime = () => {
    setEndTimeVisible(false);
  };

  const onNext = () => {
    'next';
  };

  return (
    <View style={styles.container}>
      <TopNavBar
        headerTitle="Sélection des dates"
        navigation={navigation}
        leftHeaderIcon={BackCaret}
        leftHeaderAction={() => navigation.navigate('CalendarTimeView')}
      />

      {/* <Text
        style={{
          textAlign: 'center',
          color: themeColors.accent1,
          marginVertical: hp(3),
          width: wp(80),
          fontSize: 19,
          fontWeight: '800',
        }}>
        Sélection des dates
      </Text> */}

      <View style={styles.weekdaysContainer}>{weekdays}</View>
      <FlatList
        data={[
          <Month {...{ navigation }} />,
          <Month {...{ navigation }} />,
          <Month {...{ navigation }} />,
        ]}
        renderItem={({ item }) => (
          <View style={{ marginVertical: hp(2) }}>{item}</View>
        )}
        keyExtractor={() => (Math.random() * 10).toString()}
        ListFooterComponent={() => <View style={{ height: hp(30) }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    backgroundColor: themeColors.dark,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: hp(20),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    height: hp(5),
    width: wp(70),
    borderRadius: wp(2),
    backgroundColor: themeColors.accent1,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  weekdaysContainer: {
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
    color: colors.main,
  },
});

export default CalendarDateView;
