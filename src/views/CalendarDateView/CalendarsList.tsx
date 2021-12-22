import React from 'react';
import { FlatList, View } from 'react-native';
import 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from '../../helpers/layout/responsiveLayout';
import Month from '../CalendarView/Month';

export default ({ months, selectedDates, setSelectedDates }) => {
  return (
    <FlatList
      data={months.map((month, index) => (
        <Month
          key={index}
          {...{
            month,
            selectedDates,
            setSelectedDates,
          }}
        />
      ))}
      renderItem={({ item }) => (
        <View style={{ marginVertical: hp(2) }}>{item}</View>
      )}
      keyExtractor={() => (Math.random() * 10).toString()}
      ListFooterComponent={() => <View style={{ height: hp(30) }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};
