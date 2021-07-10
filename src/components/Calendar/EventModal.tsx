/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  closeModal: any;
  isVisible: boolean;
}

const EventModal = (props: Props) => {
  const { isVisible, closeModal } = props;
  console.log(isVisible);
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
        justifyContent: 'center',
      }}>
      <View style={styles.modalView}>
        {/*
            scrollview of components of the contracts available on the clicked date.
            you have one action for the component: 'postuler'
        */}
        <Image source={{}} style={styles.pharmacyPicture} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(40),
    width: wp(100),
    backgroundColor: '#eee',
  },
  pharmacyPicture: {
    height: '100%',
    width: '30%',
    backgroundColor: 'red',
  },
});

export default EventModal;
