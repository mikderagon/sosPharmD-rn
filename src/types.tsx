import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Onboarding: undefined,
  Home: undefined,
  Welcome: undefined,
}

type OnboardingViewNavigationProp = StackNavigationProp<
  StackParamList,
  'Onboarding' // current route
>;

export type NavigationProps = {
  navigation: OnboardingViewNavigationProp,
}