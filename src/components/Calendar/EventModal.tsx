/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import _, { times } from 'underscore';
import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import { formatDay, mois } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { EventAndOwner } from './CalendarView';
import { Event, Locum } from '../../models';
import * as firestore from '../../actions/firestore';
import { defaultAvatar } from '../Home/shared';
import { toSchoolYear } from '../../utils/school';

interface Props {
  closeModal: any;
  showExperienceModal: any;
  isVisible: boolean;
  events: EventAndOwner[];
  applyForContract: (event: Event) => void;
  isLocum: boolean;
  interestedLocums: {
    day: number;
    month: number;
    year: number;
    startTime: string;
    endTime: string;
    interestedLocums: Locum[];
  };
}

const EventModal = (props: Props) => {
  const {
    isVisible,
    isLocum,
    closeModal,
    events,
    applyForContract,
    interestedLocums,
    showExperienceModal,
  } = props;

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
        */}
        <Text
          style={{
            alignSelf: 'flex-start',
            marginLeft: wp(5),
            marginTop: hp(2),
            color: colors.white,
            fontWeight: '700',
          }}>
          Contrats du {formatDay(events[0]?.event.day)}{' '}
          {mois[events[0]?.event.month - 1]}
        </Text>
        <FlatList
          data={events}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
          }}
          renderItem={({ item, index }) => {
            const locum = isLocum
              ? null
              : interestedLocums.interestedLocums[index];
            return isLocum ? (
              <View style={styles.shadow}>
                <View style={styles.component}>
                  <View style={styles.textOverPicture}>
                    <Text style={styles.address}>
                      {item.owner.pharmacy.address}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: item.owner.pharmacy.pictureUrl,
                    }}
                    style={styles.pharmacyPicture}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        marginTop: 4,
                        color: colors.darkGray,
                        width: '92%',
                      }}
                      numberOfLines={1}
                      adjustsFontSizeToFit>
                      {item.event.title}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      {/* <Text>{event?.UserId}</Text> */}
                      <Text style={{ color: colors.gray, fontSize: 12 }}>
                        Affiché par {item.owner.firstName} {item.owner.lastName}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: colors.main, fontWeight: '600' }}>
                        {item.event.startTime} à {item.event.endTime}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(30),
                        justifyContent: 'space-between',
                        bottom: 5,
                        position: 'absolute',
                      }}>
                      <TouchableOpacity
                        activeOpacity={item.event.interested ? 1 : 0.2}
                        onPress={() => {
                          if (!item.event.interested) {
                            closeModal();
                            // give time for the close modal animation to finish
                            Alert.alert(
                              'Nous envoyons vos informations au propriétaire',
                            );
                            setTimeout(() => {
                              applyForContract(item.event);
                            }, 1000);
                          }
                        }}
                        style={{
                          backgroundColor: item.event.interested
                            ? 'transparent'
                            : colors.main,
                          height: 45,
                          width: 100,
                          borderRadius: 10,
                          borderWidth: item.event.interested ? 1 : 0,
                          borderColor: colors.darkLime,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: item.event.interested
                              ? colors.darkLime
                              : colors.white,
                            fontWeight: '600',
                          }}>
                          {item.event.interested ? 'Postulé' : 'Postuler'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.shadow}>
                <TouchableOpacity
                  style={[styles.component]}
                  onPress={() => {
                    Alert.alert('État de la demande', '', [
                      {
                        text: 'Accepter',
                        onPress: () => {
                          firestore.acceptLocum(
                            item.event as Event,
                            locum || ({} as Locum),
                          );
                        },
                      },
                      {
                        text: 'Refuser',
                        onPress: () => {
                          closeModal();
                          setTimeout(() => {
                            firestore.refuseLocum(
                              item.event as Event,
                              locum || ({} as Locum),
                            );
                          }, 1000);
                        },
                        style: 'destructive',
                      },
                      {
                        text: 'Annuler',
                        onPress: () => {},
                        style: 'cancel',
                      },
                    ]);
                  }}>
                  <Image
                    source={
                      locum?.pictureUrl
                        ? { uri: locum.pictureUrl }
                        : defaultAvatar
                    }
                    style={styles.locumPicture}
                  />
                  <View style={styles.outsideImageContainer}>
                    <Text style={styles.name}>
                      {locum.firstName + ' ' + locum.lastName}
                    </Text>
                    <Text style={[styles.school, { marginTop: 1 }]}>
                      {`PharmD - ${toSchoolYear(locum.schoolYear)} année à l'${
                        locum.school
                      }`}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginTop: 3,
                        borderRadius: 10,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => showExperienceModal()}>
                      <Text
                        style={{
                          color: colors.main,
                          fontStyle: 'italic',
                        }}>
                        Voir Expérience avec Logiciels
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.timeStamp}>
                    <Text style={{ color: colors.main, fontWeight: '600' }}>
                      {item.event.startTime} à {item.event.endTime}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: hp(20),
    width: wp(100),
    backgroundColor: colors.main,
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
});

export default EventModal;
