/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import _ from 'underscore';
import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import { formatDay, mois } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { EventOwnerPharmacy } from './CalendarView';
import { Event, Locum } from '../../models';
import * as firestore from '../../actions/firestore';

interface Props {
  closeModal: any;
  isVisible: boolean;
  events: EventOwnerPharmacy[];
  applyForContract: (event: Event) => void;
  isLocum: boolean;
}

interface interestedLocum {
  interestedLocum: Locum;
  startTime: string;
  endTime: string;
}

const EventModal = (props: Props) => {
  const { isVisible, isLocum, closeModal, events, applyForContract } = props;
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
      <View
        style={[
          styles.modalView,
          { height: styles.modalView.height + hp(10) * events.length },
        ]}>
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
          Contrats du {formatDay(events[0]?.event.day)}{' '}
          {mois[events[0]?.event.month - 1]}
        </Text>
        <FlatList
          data={
            isLocum
              ? events
              : async () => {
                  await firestore.getLocumDemands(events.map(e => e.event));
                }
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.component}>
              <Image
                source={{
                  uri: item.pharmacy.pictureUrl,
                }}
                style={styles.pharmacyPicture}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ marginTop: 4 }}>{item.event.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text>{event?.UserId}</Text> */}
                  <Text style={{ color: '#494949', fontSize: 12 }}>
                    Affiché par {item.owner.firstName} {item.owner.lastName}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: colors.main, fontWeight: '600' }}>
                    {item.event.startTime} - {item.event.endTime}
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
                  <TouchableOpacity
                    onPress={() => applyForContract(item.event)}
                    style={{
                      backgroundColor: colors.darkLime,
                      height: 45,
                      width: 100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: 'white' }}>Postuler</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(20),
    width: wp(100),
    backgroundColor: '#eee',
    borderRadius: 25,
    alignItems: 'center',
  },
  component: {
    marginTop: hp(2),
    flexDirection: 'row',
    height: hp(14),
    width: wp(90),
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
