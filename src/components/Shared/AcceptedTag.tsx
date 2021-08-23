/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import icons from '../../styles/icons';

interface Props {}

const AcceptedTag = (props: Props) => {
  return (
    <View style={styles.acceptedTag}>
      <Text style={styles.acceptedTagText}>Accepté {icons.checkmark}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  acceptedTag: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -7,
    right: 10,
    backgroundColor: colors.darkLime,
    height: hp(3),
    width: wp(20),
    borderRadius: 15,
  },
  acceptedTagText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default AcceptedTag;
