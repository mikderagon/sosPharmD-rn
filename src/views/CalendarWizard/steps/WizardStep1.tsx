import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import {
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { Input } from '../../../components/TextInput';
import { useForm } from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../helpers/layout/responsiveLayout';
import colors from '../../../styles/colors';
import CircularSlider from '../../../components/CircularSlider';

const WizardStep1 = ({ navigation, onNext }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return <CircularSlider />;
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WizardStep1;
