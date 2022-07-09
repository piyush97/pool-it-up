import { Theme } from '@rneui/themed';
import { definitions } from './supabase.d';
declare module 'react-native-dotenv' {
  export const GOOGLE_MAPS_APIKEY: string;
  export const REACT_NATIVE_SUPABASE_ANON_KEY: string;
  export const REACT_NATIVE_SUPABASE_URL: string;
}
type RideConfirmationViewProps = {
  selected: string;
};

type PlaceInputProps = {
  placeholderText: string;
  ShowIcon: boolean;
  dispatcherFunction: Function;
  style?: any;
  customInputComponent?: boolean;
};
type FromToProps = {
  from: string;
  to: string;
  startDateTime: string;
  endDateTime: string;
};

type HeaderComponentProps = {
  theme: {
    colors: Colors;
  } & Theme;
  children: React.ReactElement[] | React.ReactElement;
  title: string;
};

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): Promise<void>;
  signUp(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    dob: string,
    phone: string
  ): Promise<boolean>;
  userData(email: string): Promise<definitions['Users']>;
};

type RootStackParamList = {
  RideOptionsCard: {
    options: {
      headerShown: boolean;
    };
  };
};

type SignInProps = {
  email: string;
  password: string;
};

type OnboardingProps = {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
};

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.webp' {
  const value: any;
  export = value;
}
