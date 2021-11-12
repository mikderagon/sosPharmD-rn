import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../helpers/layout/responsiveLayout';
import colors from '../../styles/colors';

interface Props {
  onPress: () => void;
  text?: string;
  active?: boolean;
  loading?: boolean;
}

const Button = ({
  onPress,
  text = 'Log in',
  active = true,
  loading,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={active ? 0.2 : 1}
      style={styles.container}
      onPress={() => {
        active ? onPress() : {};
      }}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    width: wp(80),
    borderRadius: 50,
    backgroundColor: colors.darkerBlue,
    borderWidth: 1,
    borderColor: '#263C4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 20,
  },
});

export default Button;
