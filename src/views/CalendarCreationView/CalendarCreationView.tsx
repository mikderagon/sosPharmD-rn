import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react';
import {
  Button,
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

const FilterIcon = require('../../../assets/images/filters.png');
const PharmacistFemale = require('../../../assets/images/pharmacist_female.png');
const PharmacistMale = require('../../../assets/images/pharmacist_male.png');

const CalendarCreationView = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const weekdays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((w, index) => (
    <View style={styles.weekday} key={`${index} ${w}`}>
      <Text style={styles.weekdayFont}>{w}</Text>
    </View>
  ));

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

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

  const toTimeFormat = (time: Date): string => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.headerTextRed}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Create a Calendar</Text>
          <Text style={[styles.headerText, { opacity: 0 }]}>Create</Text>
        </View>
      </View> */}

      <TopNavBar
        navigation={navigation}
        leftHeaderIcon={FilterIcon}
        leftHeaderAction={() => navigation.navigate('Calendar')}
      />

      <Text
        style={{
          color: themeColors.accent1,
          marginVertical: hp(3),
          width: wp(80),
        }}>
        Identifier le pharmacien propriétaire associé au calendrier
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp(2),
        }}>
        <Image
          source={PharmacistMale}
          style={{
            height: hp(15),
            width: hp(15),
            resizeMode: 'contain',
            tintColor: '#000',
          }}
        />
        <Image
          source={PharmacistFemale}
          style={{
            height: hp(15),
            width: hp(15),
            resizeMode: 'contain',
            tintColor: '#000',
          }}
        />
      </View>
      <View style={{ marginTop: hp(5) }}>
        <Input
          autoFocus
          control={control}
          name="firstName"
          placeholder="Prénom"
        />
      </View>
      <View style={{ height: hp(3) }} />
      <Input autoFocus control={control} name="lastName" placeholder="Nom" />

      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Start Time</Text>
        <Button
          title={toTimeFormat(startTime)}
          onPress={() => setStartTimeVisible(true)}
        />
      </View>
      <DateTimePickerModal
        isVisible={startTimeVisible}
        mode="time"
        onConfirm={confirmStartTime}
        onCancel={cancelStartTime}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>End Time</Text>
        <Button
          title={toTimeFormat(endTime)}
          onPress={() => setEndTimeVisible(true)}
        />
      </View>
      <DateTimePickerModal
        isVisible={endTimeVisible}
        mode="time"
        onConfirm={confirmEndTime}
        onCancel={cancelEndTime}
        minimumDate={startTime}
      /> */}

      {/*
      <View style={styles.weekdaysContainer}>{weekdays}</View>
      <Month {...{ navigation }} /> */}
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
    backgroundColor: colors.main,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
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
});

export default CalendarCreationView;
