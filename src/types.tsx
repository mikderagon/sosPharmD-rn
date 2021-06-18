import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Onboarding: undefined;
  Home: undefined;
  SignIn: undefined;
};

type OnboardingViewNavigationProp = StackNavigationProp<StackParamList>;

export type NavigationProps = {
  navigation: OnboardingViewNavigationProp;
};
