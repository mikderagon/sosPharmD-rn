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
  FlatList,
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

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
  const Softwares = [1, 2, 3].map((s, index) => (
    <View
      key={index.toString()}
      style={[
        styles.softwareTag,
        { borderColor: getRandomColor(), marginLeft: index === 0 ? 0 : 10 },
      ]}
    />
  ));
  return (
    <View style={styles.container}>
      <View style={styles.dateTag}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={{ uri: pictureUrl }} style={styles.userPicture} />
      <View style={styles.outsideImageContainer}>
        <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
        <Text style={[styles.school, { marginTop: 1 }]}>
          {`${year}nd year Pharmacy Student`}
        </Text>
        <Text style={[styles.school, { marginTop: 0 }]}>
          @{educationalInstitution}
        </Text>
        {/* <View style={styles.softwaresList}>
          <Text style={[styles.school, { marginRight: 5, fontWeight: '700' }]}>
            Preferred {'\n'}Softwares
          </Text>
          {Softwares}
        </View> */}
      </View>
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
  dateTag: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: colors.lime,
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    color: '#494949',
  },
  userPicture: {
    height: '100%',
    width: wp(25),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  outsideImageContainer: {
    width: wp(60),
    marginLeft: 8,
    top: 8,
    alignSelf: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#494949',
  },
  school: {
    fontSize: 9,
    fontWeight: '500',
    color: '#494949',
  },
  softwaresList: {
    marginTop: 8,
    height: 40,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  softwareTag: {
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 35,
  },
});

export default Locum;
