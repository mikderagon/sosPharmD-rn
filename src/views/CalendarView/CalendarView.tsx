import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import TopNavBar from '../../components/NavBar/TopNavBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import { themeColors } from '../../shared/styles/colors';

const FilterIcon = require('../../../assets/images/filters.png');
const PlusIcon = require('../../../assets/images/plus.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.dark,
    height: hp(100),
    width: wp(100),
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  welcomeContainer: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    width: wp(95),
    borderRadius: 10,
    backgroundColor: themeColors.accent1,
  },
});

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        headerTitle="Calendriers"
        leftHeaderIcon={FilterIcon}
        leftHeaderAction={() => {}}
        rightHeaderIcon={PlusIcon}
        rightHeaderAction={() => navigation.navigate('CalendarCreation')}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.welcomeContainer}>
          <Text>Bienvenue, Mikael!</Text>
          <Text>Voici votre liste de calendriers</Text>
        </View>
      </ScrollView>
    </View>
  );
};
