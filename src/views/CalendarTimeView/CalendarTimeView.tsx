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
import NextButton from '../../components/Button/LoginButton';

type Gender = 'm' | 'f';

const BackCaret = require('../../../assets/images/backCaret.png');
const PharmacistFemale = require('../../../assets/images/pharmacist_female.png');
const PharmacistMale = require('../../../assets/images/pharmacist_male.png');
const Clock = require('../../../assets/images/clock.png');

const CalendarTimeView = ({ navigation }) => {
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

  const toTimeFormat = (time: Date): string => {
    const hours = time.getHours();
    let minutes = time.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  const onNext = () => {
    navigation.navigate('CalendarDateView');
  };

  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        leftHeaderIcon={BackCaret}
        leftHeaderAction={() => navigation.navigate('CalendarCreationView')}
      />

      <Text
        style={{
          textAlign: 'center',
          color: themeColors.accent1,
          marginVertical: hp(3),
          width: wp(80),
          fontSize: 19,
          fontWeight: '800',
        }}>
        Sélection des heures
      </Text>

      <View
        style={{
          backgroundColor: themeColors.light,
          width: wp(95),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
        }}>
        <TouchableOpacity onPress={() => setStartTimeVisible(true)}>
          <Image
            source={Clock}
            style={{
              tintColor: themeColors.dark,
              marginVertical: hp(2),
              height: hp(16),
              width: hp(16),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setStartTimeVisible(true)}
          style={{
            backgroundColor: themeColors.dark,
            borderRadius: hp(2),
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: hp(2),
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
            Start Time
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
      </View>

      <View
        style={{
          marginTop: hp(4),
          backgroundColor: themeColors.light,
          width: wp(95),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
        }}>
        <TouchableOpacity onPress={() => setEndTimeVisible(true)}>
          <Image
            source={Clock}
            style={{
              tintColor: themeColors.dark,
              marginVertical: hp(2),
              height: hp(16),
              width: hp(16),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setEndTimeVisible(true)}
          style={{
            backgroundColor: themeColors.dark,
            borderRadius: hp(2),
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: hp(2),
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
            End Time
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

      <View style={{ position: 'absolute', bottom: hp(7) }}>
        <NextButton text="Suivant" onPress={onNext} color={themeColors.light} />
      </View>
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

export default CalendarTimeView;
