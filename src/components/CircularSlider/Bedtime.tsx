import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../helpers/layout/responsiveLayout';
import colors from '../../styles/colors';
import CircularSlider from './CircularSlider';
import Container from './components/Container';
import { PADDING } from './constants';

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: PADDING,
  },
  title: {
    fontSize: 26,
    color: colors.main,
    marginBottom: 32,
  },
});

const Bedtime = () => {
  const start = useSharedValue(0);
  const end = useSharedValue(1.5 * Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SÉLECTIONNER LES HEURES</Text>
      <Container start={start} end={end}>
        <CircularSlider start={start} end={end} />
      </Container>
    </View>
  );
};

export default Bedtime;
