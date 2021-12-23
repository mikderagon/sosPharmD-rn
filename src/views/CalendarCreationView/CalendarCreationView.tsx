import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native';
import 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TopNavBar from '../../components/NavBar/TopNavBar';
import WeekdaysBar from '../../components/WeekdaysBar/WeekdaysBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import { themeColors } from '../../shared/styles/colors';
import CalendarsList from './CalendarsList';
import TimePicker from './TimePicker';

const BackCaretIcon = require('../../../assets/images/backCaret.png');
const ClockIcon = require('../../../assets/images/clock.png');
const PlusIcon = require('../../../assets/images/plus.png');

const getMonth = m => {
  return new Date(new Date().getFullYear(), new Date().getMonth() + m, 1);
};
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => getMonth(i));

export default ({ route, navigation }) => {
  const { selectedDates, setSelectedDates } = route.params;
  const onNext = () => {
    Alert.alert('next');
    ('next');
  };
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
    let minutes = time.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  console.log(selectedDates);

  const isValidCalendar = () => {
    const timeValidity = startTime < endTime;
    const dateValidity = true;
    return timeValidity && dateValidity;
  };

  return (
    <View style={styles.container}>
      <TopNavBar
        headerTitle="Nouveau Calendrier"
        navigation={navigation}
        leftHeaderIcon={BackCaretIcon}
        leftHeaderAction={() => navigation.navigate('Calendar')}
        rightHeaderIcon={isValidCalendar() ? PlusIcon : null}
        rightHeaderAction={onNext}
      />

      <TextInput
        style={styles.nameInput}
        autoFocus
        placeholder="Propriétaire"
        placeholderTextColor="#aaa"
      />

      <View style={styles.timePickersContainer}>
        <Image source={ClockIcon} style={styles.clockIcon} />
        <TimePicker
          time={startTime}
          label="De:"
          toggle={() => setStartTimeVisible(!startTimeVisible)}
        />
        <TimePicker
          time={endTime}
          label="À:"
          toggle={() => setEndTimeVisible(!endTimeVisible)}
        />
      </View>

      <DateTimePickerModal
        date={startTime}
        isVisible={startTimeVisible}
        mode="time"
        onConfirm={confirmStartTime}
        onCancel={cancelStartTime}
      />
      <DateTimePickerModal
        date={endTime}
        isVisible={endTimeVisible}
        mode="time"
        onConfirm={confirmEndTime}
        onCancel={cancelEndTime}
        minimumDate={startTime}
      />

      <WeekdaysBar />

      <CalendarsList
        {...{
          months,
          selectedDates,
          setSelectedDates: addedDates => setSelectedDates(addedDates),
        }}
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
  timePickersContainer: {
    flexDirection: 'row',
    width: wp(95),
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(2),
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
  nameInput: {
    marginTop: hp(2),
    backgroundColor: '#fff',
    borderRadius: 5,
    height: hp(5),
    width: wp(95),
    paddingHorizontal: wp(2),
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
  clockIcon: {
    height: hp(4.5),
    width: hp(4.5),
    resizeMode: 'contain',
    tintColor: themeColors.accent1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
