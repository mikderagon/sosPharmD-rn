/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

const fourSquares = require('../../assets/images/fourSquares.png');
const verticalDots = require('../../assets/images/verticalDots.png');

const userPicture =
  'https://i.guim.co.uk/img/media/852837afc22bfa78936b7b99ba0b6db03d877dda/0_1038_2816_2113/master/2816.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=4781b085f86533dded353aa9badd0802';

const HomeView = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [markedDates, setMarkedDates] = useState({});

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerShadow]}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.headerBar}>
            <View style={styles.headerBarText}>
              {/* <Text>Burger</Text> */}
              <TouchableOpacity>
                <Image source={fourSquares} style={styles.fourSquares} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={verticalDots} style={styles.verticalDots} />
              </TouchableOpacity>

              {/* <Text>Settings</Text> */}
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
                Marc-Antoine D'Aquilla
              </Text>
              <Text style={styles.year}>4th Year UdeM</Text>
              <Text style={styles.location}>Ste-Rose, Laval</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Calednar */}
      <View style={{ marginTop: hp(11), width: '85%' }}>
        <Text style={styles2.sectionTitle}>Calendar</Text>
      </View>
    </View>
  );
};

const MAIN_COLOR = '#00BBF2';

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
    fontWeight: '600',
  },
});

export default HomeView;
