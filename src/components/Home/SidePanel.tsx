/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { Text } from 'react-native';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationProp } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
const backCaret = require('../../assets/images/backCaret.png');

interface Props {
  toggleSidePanel: () => void;
  navigation: NavigationProp;
}

const SidePanel = (props: Props) => {
  const { toggleSidePanel, navigation } = props;
  const animatedX = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(animatedX, {
      toValue: 1,
      duration: 600,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  });
  function closeSidePanel() {
    Animated.timing(animatedX, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      toggleSidePanel();
    });
  }
  return (
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={event => {
        // check if touch is outside panel
        const { nativeEvent } = event;
        const x = nativeEvent.locationX;
        const y = nativeEvent.locationY;
        if (x >= panelDimensions.width || y >= panelDimensions.height) {
          closeSidePanel();
        }
      }}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: animatedX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [wp(100), 0],
                }),
              },
            ],
          },
        ]}>
        <>
          <View style={styles.innerView}>
            <View style={styles.header}>
              <View style={styles.innerHeader}>
                <TouchableOpacity
                  onPress={closeSidePanel}
                  style={{ width: '35%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={backCaret} style={styles.backCaret} />
                    <Text>Home</Text>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { width: '30%' }]}>
                  Settings
                </Text>
                <View style={{ width: '35%' }} />
              </View>
            </View>

            <View style={styles.row}>
              <Text>Photo</Text>
            </View>
            <View style={styles.row}>
              <Text>Name</Text>
            </View>
            <View style={styles.row}>
              <Text>Favorite Softwares</Text>
            </View>
            <View style={styles.row}>
              <Text>Account type</Text>
            </View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </>
      </Animated.View>
    </TouchableOpacity>
  );
};

const panelDimensions = {
  height: hp(100),
  width: wp(100),
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: wp(100),
    height: hp(100),
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    backgroundColor: '#fff',
    height: panelDimensions.height,
    width: panelDimensions.width,
    position: 'absolute',
    // top: hp(5),
    right: 0,
    zIndex: 2,
  },
  innerView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ddd',
  },
  header: {
    height: hp(10),
    width: '100%',
    backgroundColor: 'yellow',
  },
  innerHeader: {
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backCaret: {
    tintColor: 'red',
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  row: {
    marginVertical: 1,
    height: hp(5),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default SidePanel;
