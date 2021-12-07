import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import CustomSlider from '../../../components/CustomSlider/CustomSlider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../helpers/layout/responsiveLayout';

const WizardStep2 = ({ navigation, onNext, onPrev }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <View style={styles.container}>
      <Text>Select the hours</Text>
      <TouchableOpacity onPress={onPrev}>
        <Text>Previous Step</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Text>Next Step</Text>
      </TouchableOpacity>
      <CustomSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WizardStep2;
