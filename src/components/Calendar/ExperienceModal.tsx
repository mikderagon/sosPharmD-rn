/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import SkillScale from './SkillScale';

interface Props {
  closeModal: any;
  isVisible: boolean;
}

const ExperienceModal = (props: Props) => {
  const { isVisible, closeModal } = props;

  return (
    <Modal
      onBackdropPress={closeModal}
      isVisible={isVisible}
      animationIn="slideInDown"
      animationInTiming={300}
      animationOut="slideOutUp"
      animationOutTiming={200}
      backdropOpacity={0.5}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={[styles.modalView]}>
        <View
          style={{
            width: wp(20),
            alignSelf: 'flex-start',
            marginLeft: wp(5),
          }}>
          <Text
            adjustsFontSizeToFit
            style={{
              alignSelf: 'flex-start',
              marginTop: hp(2),
              color: colors.main,
              fontWeight: '700',
            }}>
            LOGICIELS
          </Text>
          <View style={[styles.underline, { backgroundColor: colors.main }]} />
        </View>
        <FlatList
          data={[
            {
              name: 'sosmaster',
              rating: 4,
            },
            {
              name: 'autocad',
              rating: 3,
            },
            {
              name: 'photoshop',
              rating: 5,
            },
          ]}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ width: wp(80), marginTop: hp(1.5) }}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: hp(1.5),
              }}>
              <Text>{item.name}</Text>
              <SkillScale rating={item.rating} />
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingBottom: hp(3),
    width: wp(90),
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.3,
  },
  component: {
    marginTop: hp(2),
    flexDirection: 'row',
    height: hp(14),
    width: wp(90),
    // borderWidth: 1,
    // borderColor: '#ddd',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  locumPicture: {
    marginLeft: wp(3),
    marginTop: hp(1.5),
    height: hp(6),
    width: hp(6),
    resizeMode: 'contain',
  },
  pharmacyPicture: {
    alignSelf: 'center',
    marginLeft: 5,
    height: '90%',
    width: '37%',
    borderRadius: 10,
  },
  textOverPicture: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    zIndex: 1,
    height: '30%',
    width: '37%',
    justifyContent: 'flex-end',
  },
  address: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '400',
  },
  outsideImageContainer: {
    width: '60%',
    marginLeft: 10,
    top: 12,
    alignSelf: 'flex-start',
  },
  name: {
    fontWeight: '600',
    fontSize: 17,
    color: colors.darkGray,
  },
  school: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray,
  },
  timeStamp: {
    alignItems: 'flex-end',
    width: wp(12),
    position: 'absolute',
    top: hp(1.7),
    right: wp(3),
  },
  underline: {
    height: hp(0.3),
    width: '100%',
  },
});

export default ExperienceModal;
