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
import { calendarDimensions } from './Calendar';

interface Props {
  date: number;
  user: {
    city: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
  };
  onPress?: () => void;
  centerCorrection?: boolean;
}

const Contract = (props: Props) => {
  const { date, user, centerCorrection } = props;
  const { firstName, lastName, pictureUrl, city } = user;
  return (
    <View style={[styles.container, centerCorrection ? { left: wp(-5) } : {}]}>
      <View style={styles.dateTag}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.topDiv}>
        <Image source={{ uri: pictureUrl }} style={styles.userPicture} />
        <View style={styles.outsideImageContainer}>
          <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
          <Text style={[styles.school, { marginTop: 1 }]}>
            Propriétaire, Jean Coutu, 450 boul des Laurentides
          </Text>
          <Text style={[styles.school, { marginTop: 1, color: colors.main }]}>
            8:30 - 16:30
          </Text>
        </View>
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={[styles.button, { marginTop: hp(1.5) }]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginTop: hp(1.5) }]}>
          <Text style={styles.buttonText}>Refuse</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export const locumSize = {
  height: hp(11),
  width: wp(95),
};

const imageSize = locumSize.height * 0.6;

const styles = StyleSheet.create({
  container: {
    height: locumSize.height,
    width: locumSize.width,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dateTag: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: colors.lime,
    height: calendarDimensions.cell * 0.75,
    width: calendarDimensions.cell * 0.75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    color: '#494949',
  },
  topDiv: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: locumSize.height * 0.6,
  },
  userPicture: {
    marginTop: hp(4),
    height: imageSize * 1.2,
    width: imageSize * 1.2,
    borderRadius: hp(50),
    marginLeft: wp(3),
  },
  outsideImageContainer: {
    width: locumSize.width * 0.6,
    marginLeft: locumSize.width * 0.03,
    top: locumSize.height * 0.18,
    alignSelf: 'flex-start',
  },
  name: {
    fontWeight: '600',
    fontSize: 17,
    color: '#494949',
  },
  school: {
    fontSize: 12,
    fontWeight: '500',
    color: '#aaa',
  },
  button: {
    backgroundColor: colors.main,
    height: locumSize.height * 0.25,
    width: locumSize.width * 0.45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    // marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default Contract;
