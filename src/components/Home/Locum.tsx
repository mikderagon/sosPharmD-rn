/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import LinearGradient from 'react-native-linear-gradient';

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

const GRADIENT_COLORS = [
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0)',
  'rgba(30, 129, 206, 0.05)',
  'rgba(30, 129, 206, 0.1)',
  'rgba(30, 129, 206, 0.15)',
  'rgba(30, 129, 206, 0.2)',
  'rgba(30, 129, 206, 0.25)',
  'rgba(30, 129, 206, 0.3)',
];

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
      <LinearGradient colors={GRADIENT_COLORS} style={styles.gradient}>
        <ImageBackground
          source={{ uri: pictureUrl }}
          style={styles.userPicture}>
          <LinearGradient
            colors={GRADIENT_COLORS}
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
          <View style={styles.outsideImageContainer}>
            <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
            <Text style={[styles.school, { marginTop: 5 }]}>
              {`${year}nd year Pharmacy Student`}
            </Text>
            <Text style={[styles.school, { marginTop: 0 }]}>
              @{educationalInstitution}
            </Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(13),
    width: wp(85),
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#F3E8E7',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { height: 2, width: 1 },
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  userPicture: {
    height: '100%',
    width: wp(25),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  outsideImageContainer: {
    width: wp(60),
    position: 'absolute',
    left: 100,
    bottom: 5,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#494949',
  },
  school: {
    fontSize: 10,
    fontWeight: '500',
    color: '#494949',
  },
});

export default Locum;
