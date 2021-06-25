/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Animated } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Modal from 'react-native-modal';
import Input from './Input';

interface Props {
  openCalendar: () => {};
}

const Calendar = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectHours = () => {
    setModalVisible(true);
  };
  const days_alpha = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysRow = days_alpha.map((day, index) => (
    <View style={[styles.cell, { height: hp(2) }]} key={index}>
      <Text style={styles.days}>{day}</Text>
    </View>
  ));
  const days_num = [
    30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
  ];
  const daysGrid = days_num.map((day, index) => (
    <View style={styles.cell} key={index}>
      <Text style={styles.day}>{day}</Text>
    </View>
  ));
  return (
    <View style={styles.container}>
      <ScrollView
        contentInset={{ top: hp(1), bottom: hp(1) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.monthYear}>June 2021</Text>
        </View>

        <View style={styles.daysRow}>{daysRow}</View>
        <View style={styles.gridContainer}>{daysGrid}</View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={selectHours}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>New Event</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Title" />
          </View>
          <Input set={() => {}} placeholder="Location" />
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Min. Experience" />
          </View>
          <View style={{ marginTop: 12 }}>
            <Input set={() => {}} placeholder="Starts" />
            <Input set={() => {}} placeholder="Ends" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
  monthYear: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
  },
  cell: {
    height: hp(5),
    width: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    color: '#494949',
  },
  days: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 11,
  },
  daysRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footer: {
    height: hp(10),
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  modalView: {
    height: hp(80),
    width: wp(100),
    backgroundColor: '#898989',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    height: hp(5),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cancel: {
    color: '#f00',
    fontWeight: '300',
    fontSize: 15,
  },
  add: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default Calendar;
