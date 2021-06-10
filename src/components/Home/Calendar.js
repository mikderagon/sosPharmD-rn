/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

const Calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [markedDates, setMarkedDates] = useState({});

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const MAIN_COLOR = '#00BBF2';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default Calendar;
