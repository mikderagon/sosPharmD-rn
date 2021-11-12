import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import {
  Image,
  ImageURISource,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from '../../helpers/layout/responsiveLayout';

type InputProps = {
  autoFocus?: boolean;
  name: string;
  control: Control<FieldValues, object>;
  placeholder: string;
  imageSource?: ImageURISource;
};

const Input = ({
  autoFocus = false,
  name,
  control,
  placeholder,
  imageSource,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {imageSource && <Image source={imageSource} style={styles.inputImage} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          console.log('error?:name', error, name);
          return (
            <TextInput
              value={value}
              autoFocus={autoFocus}
              style={[styles.input, { width: imageSource ? '70%' : '100%' }]}
              onChangeText={onChange}
              placeholderTextColor="#bbb"
              placeholder={placeholder}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              // maxLength={20}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputImage: {
    right: wp(1.2),
    resizeMode: 'contain',
    height: '100%',
  },
  input: {
    fontSize: 19,
    color: '#494949',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: wp(80),
    height: wp(80) * 0.15,
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Input;
