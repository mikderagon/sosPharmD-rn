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

const fourSquares = require('../../assets/images/fourSquares.png');
const verticalDots = require('../../assets/images/verticalDots.png');

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
        <View style={styles.headerInnerContainer}>
          <View style={styles.headerBar}>
            <View style={styles.headerBarText}>
              <TouchableOpacity
                hitSlop={{
                  top: 10,
                  bottom: 20,
                  left: 15,
                  right: 15,
                }}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Image source={fourSquares} style={styles.fourSquares} />
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 30, left: 15, right: 15 }}
                onPress={() => {
                  navigation.navigate('Settings');
                }}>
                <Image source={verticalDots} style={styles.verticalDots} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.topLeftTitle}>
            <Text style={styles.title}>Welcome Back!</Text>
          </View>
          <View style={styles.pictureNameRow}>
            <View style={styles.userPictureShadow}>
              <Image
                source={{ uri: currentUser.pictureUrl }}
                style={styles.userPicture}
              />
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {currentUser.firstName + ' ' + currentUser.lastName}
              </Text>
              <Text style={styles.year}>{'udeM'}</Text>
              <Text style={styles.year}>{currentUser.year || 0}</Text>
              <Text style={styles.location}>{currentUser.city}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Calendar */}
      <View style={{ marginTop: hp(10) }}>
        <Text style={styles2.sectionTitle}>Calendar</Text>
        <View style={{ marginTop: hp(3) }}>
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
      </View>

      {/* Demands */}
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
            length: wp(85),
            offset: wp(85 + 10) * index + wp(7.5),
            index,
          })}
        />
      </View>
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
    backgroundColor: colors.regularBlue,
    height: responsive({ $480: hp(25), $812: hp(29) }),
    width: '100%',
    borderBottomLeftRadius: wp(15),
    borderBottomRightRadius: wp(15),
    alignItems: 'center',
    overflow: 'visible',
  },
  headerShadow: {
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.6,
  },
  headerInnerContainer: {
    width: '85%',
    height: '100%',
    overflow: 'visible',
  },
  headerBar: {
    height: hp(10),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fonts.Light,
  },
  pictureNameRow: {
    marginTop: hp(4),
    width: '100%',
    height: hp(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userPicture: {
    height: responsive({ $480: hp(16), $812: hp(19) }),
    width: responsive({ $480: wp(25), $812: wp(29) }),
    borderRadius: 22,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  userPictureShadow: {
    shadowColor: '#F3E8E7',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: { height: 7, width: 0 },
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
    height: hp(2),
    resizeMode: 'contain',
  },
  fourSquares: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
  },
});

const styles2 = StyleSheet.create({
  sectionTitle: {
    color: '#494949',
    fontSize: 22,
    fontWeight: '700',
  },
  sectionTitle2: {
    color: '#494949',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeView;
