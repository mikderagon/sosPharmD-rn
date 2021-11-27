/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import Locum from './Locum';
import LocumModal from './LocumModal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import { useState } from 'react';

const LocumsView = ({ route, navigation }) => {
  const { locums } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocum, setCurrentLocum] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Locum List</Text>
      </View>
      <View style={{ marginTop: hp(2) }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={locums}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Locum
                user={item.user}
                date={item.date.day}
                onPress={() => {
                  setCurrentLocum(item);
                  setModalVisible(true);
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
          ListFooterComponent={() => <View style={{ height: hp(6) }} />}
          ListHeaderComponent={() => <View style={{ height: hp(0) }} />}
        />
      </View>
      {currentLocum && (
        <LocumModal
          setVisibility={val => setModalVisible(val)}
          visible={modalVisible}
          locum={currentLocum}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    width: '100%',
  },
  flatListContainer: { width: wp(100), alignItems: 'center' },
  title: {
    fontWeight: '800',
    color: '#303D5C',
    fontSize: 20,
  },
  modalView: {
    marginLeft: -10,
    height: hp(40),
    width: wp(100),
    borderTopRightRadius: hp(5),
    borderTopLeftRadius: hp(5),
    backgroundColor: '#fff',
  },
});

export default LocumsView;
