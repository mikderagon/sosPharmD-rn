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
import { store } from '../../store';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { getDateState, getMonthName } from '../../utils/dates';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Calendar from './Calendar';
import Locum from './Locum';

const fourSquares = require('../../assets/images/fourSquares.png');
const verticalDots = require('../../assets/images/verticalDots.png');

const HomeView = ({ navigation }) => {
  const { state } = useContext(store);
  const thisState = getDateState();
  const thisMonthEvents = state.events.filter(event => {
    return (
      event.year === thisState.year && event.month === thisState.monthIndex
    );
  });
  const thisEventDates = thisMonthEvents.map(e => e.day);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [previousEventIndex, setPreviousEventIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentEventIndex === thisEventDates.length - 1
          ? 0
          : currentEventIndex + 1;
      setPreviousEventIndex(currentEventIndex);
      setCurrentEventIndex(nextIndex);
      locumListRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
        viewPosition: 0.5,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentEventIndex]);

  const locumListRef = useRef(null);

  const { currentUser, users } = state;

  const currentLocumTags = [
    users.find(
      user =>
        user.id === thisMonthEvents[currentEventIndex].interestedLocums[0],
    ),
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerShadow]}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.headerBar}>
            <View style={styles.headerBarText}>
              <TouchableOpacity>
                <Image source={fourSquares} style={styles.fourSquares} />
              </TouchableOpacity>
              <TouchableOpacity>
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

      {/* Calednar */}
      <View style={{ marginTop: hp(10), width: '85%' }}>
        <Text style={styles2.sectionTitle}>Calendar</Text>
        <View style={{ marginTop: hp(3) }}>
          <Calendar
            events={thisEventDates}
            currentMonth={thisState.month}
            currentMonthIndex={thisState.monthIndex}
            numberOfDaysInCurrentMonth={thisState.numberOfDays}
            firstDayOfMonthIndex={thisState.firstDayOfMonthIndex}
            firstDayOfMonth={thisState.firstDayOfMonth}
            openCalendar={() =>
              navigation.navigate('Calendar', {
                currentMonth: thisState.month,
              })
            }
            year={thisState.year}
            currentEvent={thisEventDates[currentEventIndex]}
            previousEvent={thisEventDates[previousEventIndex]}
            // give it current event which will change according to our interval in this component here
            // the calendar will run an event on currentEvent's change, Animating the circle towards the correct position in the grid
          />
        </View>
      </View>

      {/* Demands */}
      <View style={{ marginTop: hp(2) }}>
        {thisEventDates.length ? (
          <FlatList
            ref={locumListRef}
            data={currentLocumTags}
            horizontal
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />}
            ListFooterComponent={() => <View style={{ width: wp(7.5) }} />}
            ListHeaderComponent={() => <View style={{ width: wp(7.5) }} />}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Locum date={thisEventDates[index]} user={item} />
            )}
            getItemLayout={(data, index) => ({
              length: wp(85),
              offset: wp(85 + 10) * index + wp(7.5),
              index,
            })}
          />
        ) : (
          // <View style={styles3.locum}>
          //   <Text>{events[currentEventIndex].date}</Text>
          // </View>
          <Text>no events sorry</Text>
        )}
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
    height: hp(29),
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
    height: hp(19),
    width: wp(29),
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
});

export default HomeView;
