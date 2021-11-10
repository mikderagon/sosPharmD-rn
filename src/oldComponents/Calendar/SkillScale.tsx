/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';

interface Props {
  rating: number;
}

const SCALE_LENGTH = 5;

const SkillScale = (props: Props) => {
  const { rating } = props;

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Array.from({ length: SCALE_LENGTH }, (_, i) => i + 1)}
        horizontal
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return item <= rating ? (
            <View style={styles.filledCircle}>
              <View style={styles.innerFilling} />
            </View>
          ) : (
            <View style={styles.emptyCircle} />
          );
        }}
      />
    </View>
  );
};

const CIRCLE_SIZE = 18;
const CIRCLE_COLOR = colors.main;
const CIRCLE_FILL_COLOR = colors.darkBlue;
const CIRCLE_MARGINS = 7;

const styles = StyleSheet.create({
  filledCircle: {
    marginHorizontal: CIRCLE_MARGINS,
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: CIRCLE_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerFilling: {
    height: '80%',
    width: '80%',
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_FILL_COLOR,
  },
  emptyCircle: {
    marginHorizontal: CIRCLE_MARGINS,
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.white,
    borderColor: CIRCLE_COLOR,
    borderWidth: 2,
  },
});

export default SkillScale;
