declare module 'react-native-dotenv' {
  export const GOOGLE_MAPS_APIKEY: string;
  export const REACT_NATIVE_SUPABASE_ANON_KEY: string;
  export const REACT_NATIVE_SUPABASE_URL: string;
}

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