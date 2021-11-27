import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import colors from '../../styles/colors';
import shadows from '../../styles/shadows';

const FilterIcon = require('../../../assets/images/filters.png');
const PlusIcon = require('../../../assets/images/plus.png');

const TopNavBar = ({ navigation, onCreateCalendar }) => {
  return (
    <View style={[styles.container, shadows.main]}>
      <View style={styles.innerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Image source={FilterIcon} style={styles.iconSize} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>Calendriers</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onCreateCalendar}>
            <Image source={PlusIcon} style={styles.iconSize} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    zIndex: 2000,
    height: hp(9),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    marginBottom: hp(1),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: { width: wp(30), alignItems: 'flex-start' },
  headerCenter: { width: wp(30), alignItems: 'center' },
  headerRight: { width: wp(30), alignItems: 'flex-end' },
  headerText: {
    fontSize: 13,
    color: '#494949',
    fontWeight: '500',
  },
  headerTextRed: {
    fontSize: 12,
    color: 'red',
    fontWeight: '300',
  },
  iconSize: {
    tintColor: colors.main,
    height: 14,
    resizeMode: 'contain',
    width: 14,
  },
});

export default TopNavBar;
