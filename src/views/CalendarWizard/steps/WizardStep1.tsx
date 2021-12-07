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
import { ThemeProvider } from '@react-navigation/native';

const WizardStep1 = ({ navigation, onNext }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <View style={{ height: hp(100), width: wp(100) }}>
      {/* <CircularSlider /> */}
      <Text style={[styles.text, { marginTop: hp(22) }]}>De:</Text>
      <DateTimePicker
        testID="startTime"
        value={startTime}
        mode="time"
        display="spinner"
        onChange={(event, time) => setStartTime(time)}
      />
      <Text style={styles.text}>À:</Text>
      <DateTimePicker
        testID="endTime"
        value={endTime}
        mode="time"
        is24Hour={true}
        display="spinner"
        onChange={(event, time) => setEndTime(time)}
      />
      <View style={styles.nextButton}>
        <Button text="Suivant" onPress={onNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: wp(10),
    fontWeight: '800',
  },
  nextButton: {
    position: 'absolute',
    bottom: hp(5),
    alignSelf: 'center',
  },
});

export default WizardStep1;
