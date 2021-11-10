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
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import useKeyboard from '../../components/hooks/useKeyboard';
import InputForm from './InputForm';

export interface NewEvent {
  title: string;
  minExperience: string;
  startTime: string;
  endTime: string;
}

interface Props {
  addCalendarEvent: (e: NewEvent) => void;
  closeModal: any;
  isVisible: boolean;
}

const AddEventModal = (props: Props) => {
  const { isVisible, closeModal, addCalendarEvent } = props;
  const [title, setTitle] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [keyboardHeight] = useKeyboard();
  return (
    <Modal
      onBackdropPress={closeModal}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationInTiming={300}
      animationOut="slideOutDown"
      animationOutTiming={200}
      backdropOpacity={0.5}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: (keyboardHeight || 260) - 20,
      }}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal} style={styles.headerLeft}>
            <Text style={styles.cancel}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle}>Nouvel événement</Text>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => {
              addCalendarEvent({
                title,
                minExperience,
                startTime,
                endTime,
              });
              closeModal();
            }}>
            <Text style={styles.add}>Ajouter</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 12 }}>
          <InputForm
            setTitle={setTitle}
            setMinExperience={setMinExperience}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            onComplete={() => {
              addCalendarEvent({
                title,
                minExperience,
                startTime,
                endTime,
              });
              closeModal();
            }}
          />
        </View>
        {/* Add autocomplete feature based on an array of pharmacy locations that will be saved in our db */}
        {/* <Input
          ref={InputRef2}
          value={location}
          set={value => setLocation(value)}
          placeholder="Location"
          nextFocus={() => InputRef3.current.focus()}
        />
        <View style={{ marginTop: 12 }}>
          <Input
            ref={InputRef3}
            keyboardType="number-pad"
            value={minExperience}
            set={value => setMinExperience(value)}
            placeholder="Min. Experience"
          />
        </View> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(40),
    width: wp(100),
    backgroundColor: '#eee',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: hp(5),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerLeft: {
    left: 10,
    width: 100,
  },
  headerRight: {
    right: 10,
    width: 100,
  },
  cancel: {
    color: 'red',
    fontWeight: '300',
    fontSize: 15,
    textAlign: 'left',
  },
  add: {
    color: colors.main,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
  },
  modalHeaderTitle: {
    color: colors.main,
    fontSize: 17,
    fontWeight: '300',
  },
});

export default AddEventModal;
