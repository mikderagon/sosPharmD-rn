/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Animated, Image, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Calendar from './Calendar';

const fourSquares = require('../../assets/images/fourSquares.png');
const verticalDots = require('../../assets/images/verticalDots.png');

const userPicture =
  'https://i.guim.co.uk/img/media/852837afc22bfa78936b7b99ba0b6db03d877dda/0_1038_2816_2113/master/2816.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4781b085f86533dded353aa9badd0802';

const user = {
  name: 'John Doe',
  educationalInstitution: 'UdeM',
  schoolYear: '3rd year',
  location: 'Ste-Rose, Laval',
};

const events = [
  {
    date: 2,
    locum: {
      name: 'Melissa Covery',
      picture: userPicture,
    },
  },
  {
    date: 8,
    locum: {
      name: 'Guy Fieri',
      picture: userPicture,
    },
  },
  {
    date: 12,
    locum: {
      name: 'Melissa Covery',
      picture: userPicture,
    },
  },
  {
    date: 17,
    locum: {
      name: 'Melissa Covery',
      picture: userPicture,
    },
  },
  {
    date: 20,
    locum: {
      name: 'Melissa Covery',
      picture: userPicture,
    },
  },
];

function createAnimationContext() {
  // check how many events there are
  // if 0: don't do anything. show past locums? or most popular locums? if all else fails, show everyday and show that no events are planned, offer to add an event right away from that view (quicker than going to calendar)
  // if 1: show it statically, no animation
  // if 2+: switch between the two using a timed animations all looped together

  // animation code
  // start the highlight at the first event of the month(eg: 5th)
  // keep it there 3000ms, then if next event is on the same row, just slide it to it, else if it's on another row, make the highlight slide away to the right of the current and come in from the left into the next event's row.
  // repeat

  if (!events.length) {
    return; // will implement this later on
  }
  if (events.length === 1) {
    return;
  }
  // Animated.loop(
  //   Animated.sequence([
  //     Animated.delay(3000),
  //     Animated.timing(animatedVal, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //   ]),
  // ).start();
}

const HomeView = ({ navigation }) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [previousEventIndex, setPreviousEventIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousEventIndex(currentEventIndex);
      setCurrentEventIndex(
        currentEventIndex === events.length - 1 ? 0 : currentEventIndex + 1,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentEventIndex]);
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
              <Image source={{ uri: userPicture }} style={styles.userPicture} />
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {user.name}
              </Text>
              <Text style={styles.year}>{user.educationalInstitution}</Text>
              <Text style={styles.year}>{user.schoolYear}</Text>
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Calednar */}
      <View style={{ marginTop: hp(10), width: '85%' }}>
        <Text style={styles2.sectionTitle}>Calendar</Text>
        <View style={{ marginTop: hp(3) }}>
          <Calendar
            openCalendar={() => navigation.navigate('Calendar')}
            events={events}
            currentEvent={events[currentEventIndex].date}
            previousEvent={events[previousEventIndex].date}
            // give it current event which will change according to our interval in this component here
            // the calendar will run an event on currentEvent's change, Animating the circle towards the correct position in the grid
          />
        </View>
      </View>

      {/* Demands */}
      <View style={{ marginTop: hp(2) }}>
        <View style={styles3.locum}>
          <Text>{events[currentEventIndex].date}</Text>
        </View>
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

const styles3 = StyleSheet.create({
  locum: {
    height: hp(13),
    width: wp(85),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default HomeView;
