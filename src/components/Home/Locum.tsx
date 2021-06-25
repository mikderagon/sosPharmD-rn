/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  date: number;
  user: {
    picture: string;
    firstName: string;
    lastName: string;
  };
}

const Locum = (props: Props) => {
  const { date, user } = props;
  const { picture, firstName, lastName, educationalInstitution, year } = user;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.userPicturePosition}>
        <Image source={{ uri: picture }} style={styles.userPicture} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.bold}>{`${firstName} ${lastName}`}</Text>
        <Text>{`${educationalInstitution} ${year} year`}</Text>
      </View>
      <Text>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(13),
    width: wp(85),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPicturePosition: {
    marginLeft: 10,
  },
  userPicture: {
    height: hp(10),
    width: hp(10),
    borderRadius: 50,
  },
  userInfoContainer: {},
  bold: {
    fontWeight: '800',
    fontSize: 16,
  },
});

export default Locum;
