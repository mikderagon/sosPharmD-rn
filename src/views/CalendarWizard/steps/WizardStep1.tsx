import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Button from '../../../components/Button/LoginButton';
import CircularSlider from '../../../components/CircularSlider';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../helpers/layout/responsiveLayout';

const WizardStep1 = ({ navigation, onNext }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <View>
      {/* <CircularSlider /> */}
      <DateTimePicker
        style={{
          top: hp(10),
          right: wp(50),
        }}
        testID="startTime"
        value={startTime}
        mode="time"
        display="default"
        onChange={(event, time) => setStartTime(time)}
      />
      <DateTimePicker
        style={{
          top: hp(12),
          right: wp(50),
        }}
        testID="endTime"
        value={endTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, time) => setEndTime(time)}
      />
      <View style={styles.calendarPlaceholder}>
        <Text>Calendar</Text>
      </View>

      <View style={styles.nextButton}>
        <Button text="Suivant" onPress={onNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarPlaceholder: {
    marginTop: 150,
    height: 400,
    width: wp(90),
    borderRadius: 25,
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  nextButton: {
    position: 'absolute',
    top: hp(85),
    alignSelf: 'center',
  },
});

export default WizardStep1;
