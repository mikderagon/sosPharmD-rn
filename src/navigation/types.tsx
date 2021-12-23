import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Onboarding: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  Settings: undefined;
};

export type NavigationProp = StackNavigationProp<StackParamList>;

export type NavigationProps = {
  navigation: NavigationProp;
  children?: any;
};
