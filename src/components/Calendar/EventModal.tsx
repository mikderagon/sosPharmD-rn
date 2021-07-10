/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Event } from '../../models';
import colors from '../../styles/colors';
import { formatDay, getMonthName, mois } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  closeModal: any;
  isVisible: boolean;
  event: Event; // TODO: change this
}

const EventModal = (props: Props) => {
  const { isVisible, closeModal, event } = props;
  console.log(event);
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
        bottom: hp(-3),
      }}>
      <View style={styles.modalView}>
        {/*
            scrollview of components of the contracts available on the clicked date.
            you have one action for the component: 'postuler'
        */}
        <Text
          style={{
            alignSelf: 'flex-start',
            marginLeft: wp(5),
            marginTop: hp(2),
          }}>
          Contrats du {formatDay(event?.day)} {mois[event?.month - 1]}
        </Text>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          contentInset={{ bottom: hp(5) }}>
          <View style={styles.component}>
            <Image
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              style={styles.pharmacyPicture}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginTop: 4 }}>{event?.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                {/* <Text>{event?.UserId}</Text> */}
                <Text style={{ color: '#494949', fontSize: 12 }}>
                  Affiché par Mikael Deragon
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: colors.main, fontWeight: '600' }}>
                  {event?.startTime} - {event?.endTime}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: wp(30),
                  justifyContent: 'space-between',
                  bottom: 5,
                  position: 'absolute',
                  right: 40,
                }}>
                <View
                  style={{
                    backgroundColor: colors.darkLime,
                    height: 45,
                    width: 100,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ color: 'white' }}>Postuler</Text>
                </View>
                {/* <View
                  style={{
                    backgroundColor: colors.red,
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ color: 'white' }}></Text>
                </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(30),
    width: wp(100),
    backgroundColor: '#eee',
    borderRadius: 25,
    alignItems: 'center',
  },
  component: {
    marginTop: hp(2),
    flexDirection: 'row',
    height: hp(14),
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  pharmacyPicture: {
    height: '100%',
    width: '33%',
    borderRadius: 10,
  },
});

export default EventModal;
