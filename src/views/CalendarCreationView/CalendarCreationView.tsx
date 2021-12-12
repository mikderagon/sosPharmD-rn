import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react';
import {
  Button,
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
import colors from '../../styles/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Month from '../CalendarView/Month';

const CalendarCreationView = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.headerTextRed}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Create a Calendar</Text>
          <Text style={[styles.headerText, { opacity: 0 }]}>Create</Text>
        </View>
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        contentInset={{ bottom: hp(10) }}> */}
      <Input
        autoFocus
        control={control}
        name="firstName"
        placeholder="Prénom"
      />
      <Input autoFocus control={control} name="lastName" placeholder="Nom" />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      />
      <Month {...{ navigation }} />
      {/* </ScrollView> */}
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create this Calendar</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
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
});

export default CalendarCreationView;
