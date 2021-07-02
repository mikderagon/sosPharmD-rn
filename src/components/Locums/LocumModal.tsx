/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { getMonthName } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { LocumTag } from '../../interfaces';

interface Props {
  visible?: boolean;
  setVisibility: (val: boolean) => void;
  locum: LocumTag | any;
}

const LocumModal = (props: Props) => {
  const { visible, setVisibility, locum } = props;
  return (
    <Modal
      onBackdropPress={() => setVisibility(false)}
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriverForBackdrop
      backdropOpacity={0.3}
      style={{ bottom: -20, justifyContent: 'flex-end', alignItems: 'center' }}>
      <View style={styles.modalView}>
        <Text>Locum information will show up here</Text>
        <Image
          source={{ uri: locum.user.pictureUrl }}
          style={styles.locumPicture}
        />
        <Text>{locum.user.firstName}</Text>
        <Text>{locum.user.lastName}</Text>
        <Text>{locum.user.email}</Text>
        <Text>{locum.user.educationalInstitution}</Text>
        <Text>
          {getMonthName(locum.date.month) +
            ' ' +
            locum.date.day +
            ' ' +
            locum.date.year}
        </Text>
        <Text>Send message</Text>
        <Text>Accept</Text>
        <Text>Refuse</Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    height: hp(40),
    width: wp(100),
    borderTopRightRadius: hp(5),
    borderTopLeftRadius: hp(5),
    backgroundColor: '#fff',
  },
  locumPicture: {
    resizeMode: 'cover',
    height: hp(5),
    width: hp(5),
    borderRadius: 20,
  },
});

export default LocumModal;
