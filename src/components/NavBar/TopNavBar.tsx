import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import colors, { themeColors } from '../../styles/colors';
import shadows from '../../styles/shadows';

interface TopNavBarProps {
  navigation: any;
  headerTitle?: string;
  leftHeaderIcon?: any;
  leftHeaderAction?: () => void;
  rightHeaderIcon?: any;
  rightHeaderAction?: () => void;
}

const TopNavBar = ({
  navigation,
  headerTitle,
  leftHeaderIcon,
  leftHeaderAction,
  rightHeaderIcon,
  rightHeaderAction,
}: TopNavBarProps) => {
  return (
    <View style={[styles.container, shadows.main]}>
      <View style={styles.innerContainer}>
        <View style={styles.headerLeft}>
          {leftHeaderIcon && (
            <TouchableOpacity onPress={leftHeaderAction}>
              <Image source={leftHeaderIcon} style={styles.iconSize} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerCenter}>
          {headerTitle && (
            <Text numberOfLines={1} style={styles.headerText}>
              {headerTitle}
            </Text>
          )}
        </View>
        <View style={styles.headerRight}>
          {rightHeaderIcon && (
            <TouchableOpacity onPress={rightHeaderAction}>
              <Image source={rightHeaderIcon} style={styles.iconSize} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    zIndex: 2000,
    height: hp(10),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: themeColors.light,
  },
  innerContainer: {
    marginBottom: hp(1),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: { width: wp(15), alignItems: 'flex-start' },
  headerCenter: { width: wp(60), alignItems: 'center' },
  headerRight: { width: wp(15), alignItems: 'flex-end' },
  headerText: {
    fontSize: 18,
    color: themeColors.dark,
    fontWeight: '500',
  },
  headerTextRed: {
    fontSize: 18,
    color: 'red',
    fontWeight: '300',
  },
  iconSize: {
    tintColor: themeColors.dark,
    height: 20,
    resizeMode: 'contain',
    width: 18,
  },
});

export default TopNavBar;
