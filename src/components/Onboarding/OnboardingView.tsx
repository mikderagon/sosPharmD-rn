/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationProps } from '../../types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsiveLayout';
import Button from './Button';

const OnboardingImage1 = require('assets/images/onboarding1.png');
const OnboardingImage2 = require('assets/images/onboarding2.png');
const OnboardingImage3 = require('assets/images/onboarding3.png');

interface Props {}

const OnboardingSlideFactory = (
  source: ImageSourcePropType,
  title: string,
  text: string,
) => (
  <View style={styles.carouselSlide}>
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.onboardingImages} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const OnboardingView = ({ navigation }: NavigationProps) => {
  const slides = [
    {
      component: OnboardingSlideFactory(
        OnboardingImage1,
        'Besoin de locums?',
        'Trouvez facilement des locums qualifiés pour tous vos postes à combler',
      ),
      buttonText: 'Suivant',
    },
    {
      component: OnboardingSlideFactory(
        OnboardingImage2,
        'Organisez votre horaire rapidement',
        "Soyez notifié dès qu'un locum est disponible pour l'un de vos postes",
      ),
      buttonText: 'Suivant',
    },
    {
      component: OnboardingSlideFactory(
        OnboardingImage3,
        'Restez assurés',
        "Chaque locum passe par un examen qui assure la qualité et l'authenticité de son expérience",
      ),
      buttonText: 'Suivant',
    },
  ];

  const renderItem = ({ item }: any) => {
    return item.component;
  };

  const [activeSlide, setActiveSlide] = useState(0);
  let carouselRef = useRef(null);

  const lastSlideActive = activeSlide === slides.length - 1;

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={slides}
        renderItem={renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        containerStyle={styles.pagination}
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        dotStyle={{ ...styles.dotStyle, width: 15 }}
        inactiveDotStyle={styles.dotStyle}
      />
      <View style={styles.buttonsContainer}>
        {activeSlide > 0 && (
          <Button
            onPress={() => {
              carouselRef.current.snapToPrev();
              setActiveSlide(activeSlide - 1);
            }}
            text="Précédent"
            style="borderless"
          />
        )}
        <Button
          onPress={() => {
            if (lastSlideActive) {
              navigation.navigate('SignIn');
            } else {
              carouselRef.current.snapToNext();
              setActiveSlide(activeSlide + 1);
            }
          }}
          text={slides[activeSlide].buttonText}
          // style={activeSlide == slides.length - 1 ? 'bold' : 'default'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  carouselSlide: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  imageContainer: {
    height: hp(30),
    marginTop: hp(20),
    width: '100%',
    justifyContent: 'flex-end',
  },
  onboardingImages: {
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    maxWidth: wp(90),
    fontSize: 28,
    marginTop: hp(10),
    textAlign: 'center',
    fontWeight: '600',
    color: '#494949',
  },
  text: {
    color: '#aaa',
    fontSize: 18,
    marginTop: hp(3),
    width: wp(80),
    textAlign: 'center',
    fontWeight: '300',
  },
  pagination: {
    position: 'absolute',
    top: hp(49.5),
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: -10,
    backgroundColor: '#494949',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: hp(10),
    flexDirection: 'row',
  },
});

export default OnboardingView;
