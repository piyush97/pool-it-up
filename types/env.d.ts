declare module 'react-native-dotenv' {
  export const GOOGLE_MAPS_APIKEY: string;
  export const REACT_NATIVE_SUPABASE_ANON_KEY: string;
  export const REACT_NATIVE_SUPABASE_URL: string;
}

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};
type SignInProps = {
  email: string;
  password: string;
};
