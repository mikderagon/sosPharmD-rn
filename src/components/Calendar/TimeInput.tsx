/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { heightPercentageToDP as hp } from '../../utils/responsiveLayout';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  autoFocus?: boolean;
  set: Dispatch<SetStateAction<any>>;
  placeholder: string;
  value?: string;
  marginLeft?: number;
  maximumTime?: string;
}

const TimeInput = (props: Props) => {
  const { set, placeholder, value, marginLeft = 10, maximumTime } = props;
  const [_hours, _minutes] = value?.split(':');
  const [hours, setHours] = useState(_hours);
  const [minutes, setMinutes] = useState(_minutes);
  function onChange(event, selectedTime) {
    console.log(selectedTime);
  }
  console.log(maximumTime);
  const maximumDate = () => {
    if (maximumTime) {
      const [h, m] = maximumTime?.split('');
      console.log(h, m);
      return new Date();
    }
    return new Date();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}</Text>
      <DateTimePicker
        style={{
          width: '62%',
          marginLeft,
          justifyContent: 'center',
        }}
        testID="dateTimePicker"
        value={new Date()}
        maximumDate={maximumDate()}
        mode="time"
        display="inline"
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#494949',
    borderWidth: 0.2,
    height: hp(5),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '200',
    color: colors.darkerBlue,
  },
  input: {
    marginLeft: 5,
    fontSize: 15,
    color: '#494949',
    width: '5%',
    textAlign: 'left',
    fontWeight: '400',
  },
});

export default TimeInput;
