import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationProps } from '../../navigation/types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';

const ProfileView = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileView;
