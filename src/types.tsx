import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Onboarding: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  AccountConfirmation: undefined;
  Calendar: undefined;
};

type OnboardingViewNavigationProp = StackNavigationProp<StackParamList>;

export type NavigationProps = {
  navigation: OnboardingViewNavigationProp;
  children?: any;
};
