import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Button from '../../components/Button/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../shared/helpers/layout/responsiveLayout';
import { NavigationProps } from '../../navigation/types';

const OnboardingImage1 = require('assets/images/onboarding1.png');
const OnboardingImage2 = require('assets/images/onboarding2.png');
const OnboardingImage3 = require('assets/images/onboarding3.png');

interface SlideProps {
  source: ImageSourcePropType;
  title: string;
  text: string;
}

const renderSlide = ({ source, title, text }: SlideProps) => (
  <View style={styles.carouselSlide}>
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.onboardingImages} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const slides = [
  {
    source: OnboardingImage1,
    title: 'Besoin de locums?',
    text: 'Trouvez facilement des locums qualifiés pour tous vos postes à combler',
  },
  {
    source: OnboardingImage2,
    title: 'Organisez votre horaire rapidement',
    text: "Soyez notifié dès qu'un locum est disponible pour l'un de vos postes",
  },
  {
    source: OnboardingImage3,
    title: 'Soyez rassurés',
    text: "Chaque locum passe par un examen qui assure la qualité et l'authenticité de son expérience",
  },
];

const OnboardingView = ({ navigation }: NavigationProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  let carouselRef: Carousel<{
    source: any;
    title: string;
    text: string;
  }>;

  const lastSlideActive = activeSlide === slides.length - 1;

  return (
    <View style={styles.container}>
      <Carousel
        ref={c => {
          if (c !== null) {
            carouselRef = c;
          }
        }}
        data={slides}
        renderItem={({ item }) => renderSlide(item)}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        containerStyle={styles.pagination}
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
      <View style={styles.buttonsContainer}>
        {activeSlide > 0 && (
          <Button
            onPress={() => {
              carouselRef.snapToPrev();
              setActiveSlide(activeSlide - 1);
            }}
            text="Précédent"
            style="borderless"
          />
        )}
        <Button
          style=""
          onPress={() => {
            if (lastSlideActive) {
              navigation.navigate('SignIn');
            } else {
              carouselRef.snapToNext();
              setActiveSlide(activeSlide + 1);
            }
          }}
          text="Suivant"
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
    width: 15,
    height: 10,
    borderRadius: 50,
    marginHorizontal: -10,
    backgroundColor: '#494949',
  },
  inactiveDotStyle: {
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
