/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  date: number;
  user: {
    city: string;
    firstName: string;
    lastName: string;
    id: number;
    pictureUrl: string;
    year: number;
    educationalInstitution: string;
  };
  onPress?: () => void;
}

const Locum = (props: Props) => {
  const { date, user, onPress } = props;
  const {
    firstName,
    lastName,
    pictureUrl,
    city,
    year,
    educationalInstitution,
  } = user;
  return (
    <View style={styles.container}>
      <View style={styles.userPicturePosition}>
        <Image source={{ uri: pictureUrl }} style={styles.userPicture} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.bold}>{`${firstName} ${lastName}`}</Text>
        <Text>{`${educationalInstitution} - year ${year}`}</Text>
      </View>
      <Text>{date}</Text>
    </View>
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
