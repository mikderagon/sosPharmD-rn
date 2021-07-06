/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import _ from 'underscore';
import _String from 'underscore.string';
import { store } from '../../store';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import * as dates from '../../utils/dates';
import { responsive } from '../../utils/phoneSizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Calendar from './Calendar';
import Locum from './Locum';
import CalendarEventTag from './CalendarEventTag';
import { LocumTag } from '../../interfaces';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

const fourSquares = require('../../assets/images/fourSquares.png');
const verticalDots = require('../../assets/images/verticalDots.png');
const calendar = require('../../assets/images/calendarIcon.png');
const locumIcon = require('../../assets/images/locumIcon.png');

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
  hexToRgba(colors.main, 0.6),
  hexToRgba(colors.main, 0.8),
  hexToRgba(colors.main, 1),
  hexToRgba(colors.main, 0.8),
  hexToRgba(colors.main, 0.6),
];

const HomeView = ({ navigation }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentEventIndex === thisMonthEventDates.length - 1 ||
        thisMonthEventDates.length === 0
          ? 0
          : currentEventIndex + 1;
      setPreviousEventIndex(currentEventIndex);
      setCurrentEventIndex(nextIndex);
      horizontalFlatListRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
        viewPosition: 0.5,
      });
    }, 3000);
    return () => clearInterval(interval);
  });
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [previousEventIndex, setPreviousEventIndex] = useState(0);
  const horizontalFlatListRef = useRef(null);
  const { state } = useContext(store);
  const { currentUser, users } = state;
  const CalendarState = dates.getCalendarState(new Date());

  // TODO: turn into api call
  const thisMonthEvents = state.events.filter(
    event =>
      event.year === CalendarState.year && event.month === CalendarState.month,
  );
  const thisMonthEventDates = _.flatten(
    thisMonthEvents.map(e =>
      Array.from({ length: e.interestedLocums.length }).fill(e.day),
    ),
  );

  // TODO: turn into api call
  let currentLocumTags: LocumTag[] = [];
  for (const event of thisMonthEvents) {
    const theLocumsAre = event.interestedLocums;
    for (const locum of theLocumsAre) {
      const userFound = users.find(user => user.id === locum);
      if (userFound) {
        currentLocumTags.push({
          user: userFound,
          date: { day: event.day, month: event.month, year: event.year },
        });
      }
    }
  }

  // TODO: create interface and component
  const noLocumTags = [
    {
      title: 'No Locum',
      text: 'No interested locums yet',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerShadow]}>
        <LinearGradient colors={GRADIENT_COLORS} style={styles.gradientView}>
          <View style={styles.headerBar}>
            <View style={styles.headerBarText}>
              <View style={styles.topLeftTitle}>
                <Text style={styles.title}>
                  Hi,{' '}
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
              source={{ uri: currentUser.pictureUrl }}
              style={styles.userPicture}
            />
          </View>
          <Text style={[styles.name, { marginTop: hp(2) }]}>
            {currentUser.firstName + ' ' + currentUser.lastName + ', '}
            <Text style={styles.userType}>
              {_String.capitalize(currentUser.type)}
            </Text>
          </Text>
          <Text style={styles.location}>{currentUser.pharmacy}</Text>
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
        <Text style={styles2.sectionTitle}>Your Calendar</Text>
        <Image source={calendar} style={styles.calendarIcon} />
      </View>
      <View style={{ marginTop: hp(2) }}>
        <Calendar
          events={thisMonthEventDates}
          state={CalendarState}
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
        <Text style={styles2.sectionTitle2}>Your Locums</Text>
        <Image source={locumIcon} style={styles.calendarIcon} />
      </View>

      <View style={{ marginTop: hp(2) }}>
        <FlatList
          ref={horizontalFlatListRef}
          data={currentLocumTags.length ? currentLocumTags : noLocumTags}
          horizontal
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />}
          ListFooterComponent={() => <View style={{ width: wp(7.5) }} />}
          ListHeaderComponent={() => <View style={{ width: wp(7.5) }} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            currentLocumTags.length ? (
              <Locum
                date={thisMonthEventDates[index]}
                user={item.user}
                onPress={() => {
                  navigation.navigate('Locums', {
                    locums: currentLocumTags,
                  });
                }}
              />
            ) : (
              <CalendarEventTag />
            )
          }
          // TODO: get length and offset from renderItem's component (<Locum />)
          getItemLayout={(data, index) => ({
            length: wp(95),
            offset: wp(95 + 10) * index + wp(7.5),
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
    // shadowColor: '#F3E8E7',
    // shadowOpacity: 0.7,
    // shadowRadius: 1,
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
    fontSize: 10,
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

export default HomeView;
