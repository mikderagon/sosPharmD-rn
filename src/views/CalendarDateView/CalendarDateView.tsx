import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import NextButton from '../../components/Button/LoginButton';
import TopNavBar from '../../components/NavBar/TopNavBar';
import WeekdaysBar from '../../components/WeekdaysBar/WeekdaysBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import { themeColors } from '../../styles/colors';
import CalendarsList from './CalendarsList';

const BackCaret = require('../../../assets/images/backCaret.png');

const getMonth = m => {
  return new Date(new Date().getFullYear(), new Date().getMonth() + m, 1);
};
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => getMonth(i));

export default ({ navigation }) => {
  const onNext = () => {
    'next';
  };
  return (
    <View style={styles.container}>
      <TopNavBar
        headerTitle="Sélection des dates"
        navigation={navigation}
        leftHeaderIcon={BackCaret}
        leftHeaderAction={() => navigation.navigate('CalendarTimeView')}
      />
      <WeekdaysBar />

      <CalendarsList {...{ months }} />

      {/* ranges selected and */}
      <View style={{ marginBottom: hp(3) }}>
        <NextButton
          onPress={onNext}
          color={themeColors.accent2}
          text="Suivant"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    backgroundColor: themeColors.dark,
  },
  header: {
    height: hp(9),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    marginVertical: hp(2),
    height: 200,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  headerInner: {
    marginBottom: hp(1),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: hp(20),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    height: hp(5),
    width: wp(70),
    borderRadius: wp(2),
    backgroundColor: themeColors.accent1,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
