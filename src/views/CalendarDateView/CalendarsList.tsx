import React from 'react';
import { FlatList, View } from 'react-native';
import 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from '../../helpers/layout/responsiveLayout';
import Month from '../CalendarView/Month';

export default ({ months }) => {
  return (
    <FlatList
      data={months.map(month => (
        <Month {...{ month }} />
      ))}
      // data={Array.from({ length: 5 }).fill(<Month />)}
      renderItem={({ item }) => (
        <View style={{ marginVertical: hp(2) }}>{item}</View>
      )}
      keyExtractor={() => (Math.random() * 10).toString()}
      ListFooterComponent={() => <View style={{ height: hp(30) }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};
