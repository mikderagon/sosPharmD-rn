import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import NextButton from '../../components/Button/LoginButton';
import TopNavBar from '../../components/NavBar/TopNavBar';
import WeekdaysBar from '../../components/WeekdaysBar/WeekdaysBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { themeColors } from '../../styles/colors';
import CalendarsList from './CalendarsList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BackCaret = require('../../../assets/images/backCaret.png');

const getMonth = m => {
  return new Date(new Date().getFullYear(), new Date().getMonth() + m, 1);
};
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => getMonth(i));

export default ({ route, navigation }) => {
  const { selectedDates, setSelectedDates } = route.params;
  const onNext = () => {
    'next';
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

  return (
    <View style={styles.container}>
      <TopNavBar
        headerTitle="Sélection des dates"
        navigation={navigation}
        leftHeaderIcon={BackCaret}
        leftHeaderAction={() => navigation.navigate('CalendarCreationView')}
      />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => setStartTimeVisible(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: wp(3),
            paddingHorizontal: wp(3),
          }}>
          <Text
            style={{
              color: themeColors.accent1,
              fontSize: 16,
              fontWeight: '800',
              marginLeft: wp(2),
            }}>
            De:
          </Text>
          <View
            style={{
              marginLeft: wp(5),
              marginRight: wp(3),
              borderRadius: 10,
              height: hp(5),
              paddingHorizontal: wp(6),
              backgroundColor: themeColors.accent1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: themeColors.dark,
              }}>
              {toTimeFormat(startTime)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setEndTimeVisible(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: wp(3),
            paddingHorizontal: wp(3),
          }}>
          <Text
            style={{
              color: themeColors.accent1,
              fontSize: 16,
              fontWeight: '800',
              marginLeft: wp(2),
            }}>
            À:
          </Text>
          <View
            style={{
              marginLeft: wp(5),
              marginRight: wp(3),
              borderRadius: 10,
              height: hp(5),
              paddingHorizontal: wp(6),
              backgroundColor: themeColors.accent1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: themeColors.dark,
              }}>
              {toTimeFormat(endTime)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={startTimeVisible}
        mode="time"
        onConfirm={confirmStartTime}
        onCancel={cancelStartTime}
      />
      <DateTimePickerModal
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

      {/* ranges selected and */}
      {Object.keys(selectedDates).length > 0 && (
        <View style={{ marginBottom: hp(3) }}>
          <NextButton
            onPress={onNext}
            color={themeColors.accent2}
            text="Ajouter"
          />
        </View>
      )}
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
});
