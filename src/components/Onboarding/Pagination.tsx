/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import propTypes from 'prop-types';
 import { Image, Button, StyleSheet, Text, View } from 'react-native';
 import 'react-native-gesture-handler';
 import {
   heightPercentageToDP as hp,
   widthPercentageToDP as wp,
 } from '../../utils/responsiveLayout';
 
 interface Props {
   title: string,
   text: string,
   image: Image,
 }
 
 const Pagination = () => {
   return (
     <View style={styles.container}>
     </View>
   );
 };

 
 const styles = StyleSheet.create({
   container: {
     height: '100%',
     width: wp(100),
     backgroundColor: '#fff',
   },
 });
 
 export default Pagination;
 