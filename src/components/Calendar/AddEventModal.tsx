/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { CalendarEvent } from '../../interfaces';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { DateObject } from './CalendarView';
import Input from './Input';

interface Props {
  addCalendarEvent: (event: CalendarEvent) => void;
  event?: CalendarEvent & DateObject;
  toggleModal: any;
  isVisible: boolean;
}

const AddEventModal = (props: Props) => {
  const { isVisible, toggleModal, addCalendarEvent, event } = props;
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  return (
    <Modal
      onBackdropPress={toggleModal}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ alignItems: 'center', justifyContent: 'flex-end', bottom: -20 }}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle}>
            {event ? 'Edit Event' : 'New Event'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              addCalendarEvent({
                title,
                location,
                minExperience,
                startTime,
                endTime,
              });
              toggleModal();
            }}>
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }}>
          <Input
            value={event?.title}
            set={val => setTitle(val)}
            placeholder="Title"
            autoFocus
          />
        </View>
        <Input
          value={event?.location}
          set={val => setLocation(val)}
          placeholder="Location"
        />
        <View style={{ marginTop: 12 }}>
          <Input
            value={event?.minExperience}
            set={val => setMinExperience(val)}
            placeholder="Min. Experience"
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <Input
            value={event?.startTime}
            set={val => setStartTime(val)}
            placeholder="Starts"
          />
          <Input
            value={event?.endTime}
            set={val => setEndTime(val)}
            placeholder="Ends"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(60),
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

export default AddEventModal;
