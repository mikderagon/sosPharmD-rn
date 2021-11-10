/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { Alert, Text } from 'react-native';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import colors from '../../styles/colors';
import { NavigationProp } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import * as firestore from '../../server/firestore';

const backCaret = require('assets/images/backCaret.png');

const SettingsView = ({ navigation }) => {
  function handleSignOut() {
    firestore
      .signOut()
      .then(success => {
        // success
      })
      .catch(e => {
        console.error(e);
      });
  }
  return (
    <View style={[styles.container]}>
      <>
        <View style={styles.innerView}>
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{ width: '35%' }}>
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(16),
                  }}>
                  <Image source={backCaret} style={styles.backCaret} />
                  <Text style={styles.leftHeaderText}>Retour</Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { width: '30%' }]}>
                Paramètres
              </Text>
              <View style={{ width: '35%' }} />
            </View>
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Favorite Softwares</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Account type</Text>
          </View> */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert('Se Déconnecter', '', [
                {
                  text: 'Non',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Oui',
                  onPress: () => {
                    handleSignOut();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'SignIn' }],
                    });
                  },
                },
              ]);
            }}>
            <Text style={styles.rowText}>Se Déconnecter</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

const panelDimensions = {
  height: hp(100),
  width: wp(100),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: panelDimensions.height,
    width: panelDimensions.width,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  innerView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    height: hp(10),
    width: '100%',
    backgroundColor: colors.main,
  },
  innerHeader: {
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backCaret: {
    tintColor: '#fff',
    height: 17,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    marginVertical: 1,
    height: hp(5),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  rowText: {
    marginLeft: 10,
  },
  leftHeaderText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default SettingsView;
