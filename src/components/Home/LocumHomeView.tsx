/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import _ from 'underscore';
import _String from 'underscore.string';
import { LocumTag } from '../../interfaces';
import { store } from '../../store';
import colors from '../../styles/colors';
import * as dates from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Button from './Button';
import Calendar from './Calendar';
import CalendarEventTag from './CalendarEventTag';
import Locum, { locumSize } from './Locum';

const fourSquares = require('assets/images/fourSquares.png');
const verticalDots = require('assets/images/verticalDots.png');
const calendar = require('assets/images/calendarIcon.png');
const locumIcon = require('assets/images/locumIcon.png');
const defaultAvatar = {
  owner: {
    male: { uri: 'https://image.flaticon.com/icons/png/512/1152/1152624.png' },
    female: {
      uri: 'https://image.flaticon.com/icons/png/512/1152/1152623.png',
    },
  },
};

function hexToRgba(hex: string, opacity: number) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${(c >> 16) & 255},${(c >> 8) & 255},${c & 255},${opacity})`;
  }
  throw new Error('Bad Hex');
}

const GRADIENT_COLORS = [
  hexToRgba(colors.main, 1),
  hexToRgba(colors.main, 0.9),
  hexToRgba(colors.main, 0.8),
  hexToRgba(colors.main, 0.9),
  hexToRgba(colors.main, 1),
];

const LocumHomeView = ({ navigation }) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [previousEventIndex, setPreviousEventIndex] = useState(0);
  const [horizontalFlatListScrolled, setHorizontalFlatListScrolled] =
    useState(false);
  const horizontalFlatListRef = useRef(null);
  const { state, dispatch } = useContext(store);
  const { currentUser, users, locumTags, thisMonthEventDates } = state;
  const CalendarState = dates.getCalendarState(new Date());
  // const { currentUser } = auth();

  useEffect(() => {
    if (locumTags.length > 1) {
      const interval = setInterval(() => {
        const nextIndex =
          currentEventIndex === thisMonthEventDates.length - 1 ||
          thisMonthEventDates.length === 0
            ? 0
            : currentEventIndex + 1;
        setPreviousEventIndex(currentEventIndex);
        setCurrentEventIndex(nextIndex);
        setHorizontalFlatListScrolled(true);
        horizontalFlatListRef.current.scrollToIndex({
          animated: true,
          index: nextIndex,
          viewPosition: 0.5,
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  // function onAuthStateChanged(user) {
  //   console.log(currentUser);
  //   console.log(user);
  //   if (!user.emailVerified) {
  //   }
  // }

  // useEffect(() => {
  // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  // return subscriber;
  // }, []);

  // TODO: create interface and component
  const noLocumTags = [
    {
      title: 'No Locum',
      text: 'No interested locums yet',
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        // onBackdropPress={() => {}}
        // isVisible={!currentUser.emailVerified}
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
          <Text>Verifiy your email</Text>
          <Button
            onPress={() => {
              // check again currentuser to see if emailverified
              // 1- refresh user
              // 2- do the ssimple check
              auth().currentUser?.reload();
            }}
          />
        </View>
      </Modal>
      <View style={[styles.header, styles.headerShadow]}>
        <LinearGradient colors={GRADIENT_COLORS} style={styles.gradientView}>
          <View style={styles.headerBar}>
            <View style={styles.headerBarText}>
              <View style={styles.topLeftTitle}>
                <Text style={styles.title}>
                  Bonjour,{' '}
                  <Text style={[styles.title, { fontWeight: '800' }]}>
                    {currentUser.firstName}!
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 30, left: 15, right: 15 }}
                onPress={() => {
                  navigation.navigate('Settings');
                }}>
                <Image source={verticalDots} style={styles.verticalDots} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.pictureNameRow}>

            <View style={styles.userInfoContainer}>
              <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {currentUser.firstName + ' ' + currentUser.lastName}
              </Text>
              <Text style={styles.year}>{'udeM'}</Text>
              <Text style={styles.year}>{currentUser.year || 0}</Text>
              <Text style={styles.location}>{currentUser.city}</Text>
            </View>
          </View> */}
          <View style={[styles.userPictureShadow, { marginTop: hp(1) }]}>
            <Image
              source={
                currentUser.pictureUrl
                  ? { uri: currentUser.pictureUrl }
                  : defaultAvatar.owner.male
              }
              style={styles.userPicture}
            />
          </View>
          <Text style={[styles.name, { marginTop: hp(2) }]}>
            {currentUser.firstName + ' ' + currentUser.lastName + ', '}
            <Text style={styles.userType}>{_String.capitalize('Locum')}</Text>
          </Text>
          <Text style={styles.location}>
            {currentUser.accountType === 'locum'
              ? currentUser.educationalInstitution
              : currentUser.pharmacy}
          </Text>
        </LinearGradient>
      </View>
      {/* Calendar */}
      <View
        style={{
          marginTop: hp(2),
          justifyContent: 'space-between',
          width: '92%',
          flexDirection: 'row',
        }}>
        <Text style={styles2.sectionTitle}>Votre Calendrier</Text>
        <Image source={calendar} style={styles.calendarIcon} />
      </View>
      <View style={{ marginTop: hp(2) }}>
        <Calendar
          events={thisMonthEventDates}
          calendarState={CalendarState}
          openCalendar={() =>
            navigation.navigate('Calendar', {
              currentMonth: CalendarState.month,
            })
          }
          currentEvent={thisMonthEventDates[currentEventIndex]}
          previousEvent={thisMonthEventDates[previousEventIndex]}
        />
      </View>
      {/* Demands */}
      {/* <Text
        style={[styles2.sectionSubtitle, { width: '85%', marginTop: hp(2) }]}>
        Locums qui ont postulé
      </Text> */}
      <View
        style={{
          marginTop: hp(2),
          justifyContent: 'space-between',
          width: '92%',
          flexDirection: 'row',
        }}>
        <Text style={styles2.sectionTitle2}>
          Vos {currentUser.accountType === 'locum' ? 'Opportunités' : 'Locums'}
        </Text>
        <Image source={locumIcon} style={styles.calendarIcon} />
      </View>
      <View style={{ marginTop: hp(2) }}>
        <FlatList
          ref={horizontalFlatListRef}
          data={locumTags.length ? locumTags : noLocumTags}
          horizontal
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />}
          ListFooterComponent={() => <View style={{ width: wp(7.5) }} />}
          ListHeaderComponent={() => <View style={{ width: wp(7.5) }} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            locumTags.length ? (
              <Locum
                date={thisMonthEventDates[index]}
                user={item.user}
                centerCorrection={
                  !horizontalFlatListScrolled || locumTags.length === 1
                }
              />
            ) : (
              <CalendarEventTag />
            )
          }
          getItemLayout={(data, index) => ({
            length: locumSize.width,
            offset: (locumSize.width + wp(10)) * index + wp(7.5),
            index,
          })}
        />
      </View>
      {/* <View
        style={{
          height: hp(7),
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#aaa',
            fontWeight: '600',
            fontSize: 10,
            textAlign: 'center',
          }}>
          © {CalendarState.year} SOSPharmD App. All Rights Reserved.
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  modalView: {
    height: hp(40),
    width: wp(70),
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  header: {
    // backgroundColor: colors.main,
    height: hp(33),
    width: '100%',
    borderBottomLeftRadius: wp(9),
    borderBottomRightRadius: wp(9),
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerShadow: {
    // shadowColor: '#000',
    // shadowOpacity: 0.5,
    // shadowRadius: 100,
    // shadowOffset: { height: 5, width: 2 },
  },
  gradientView: {
    height: hp(33),
    width: '100%',
    alignItems: 'center',
  },
  headerBar: {
    height: hp(8),
    // backgroundColor: 'red',
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerBarText: {
    marginTop: hp(3),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  topLeftTitle: {
    marginTop: hp(0),
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    // fontFamily: fonts.Light,
  },
  calendarIcon: {
    height: hp(3.3),
    width: hp(5),
    resizeMode: 'contain',
    tintColor: colors.main,
  },
  pictureNameRow: {
    marginTop: hp(4),
    width: '100%',
    height: hp(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userPicture: {
    height: hp(16),
    width: hp(16),
    borderRadius: hp(50),
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'white',
  },
  userPictureShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 1 },
  },
  userInfoContainer: {
    width: wp(40),
  },
  name: {
    color: '#fff',
    fontWeight: '400',
  },
  year: {
    marginTop: 2,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  location: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
  },
  verticalDots: {
    height: hp(2.3),
    resizeMode: 'contain',
  },
  userType: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});

const styles2 = StyleSheet.create({
  sectionTitle: {
    // color: '#494949',
    color: colors.main,
    fontSize: 22,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: colors.main,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle2: {
    color: colors.main,
    fontSize: 22,
    fontWeight: '700',
  },
});

export default LocumHomeView;
