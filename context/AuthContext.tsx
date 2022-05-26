/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage';
import propTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import authService from '../service/authService';
import submitUserData from '../service/DbService';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
/**
 * Auth approach by using the AsyncStorage to store the user data
 *
 * @param {object} children - The props passed to the component.
 * @return {React.ReactElement} - Authentication context.
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const authDataParsed = JSON.parse(authDataSerialized);
        setAuthData(authDataParsed);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);
  /**
   * @description - This function is used to sign in the user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @return {Promise} - The promise of the request
   * @author - Piyush Mehta <me@piyushmehta.com>
   * @return {boolean} - The promise of the request
   */
  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const { user: signInData = null, error } = await authService.signIn(email, password);
      if (error) {
        Alert.alert('Error', error.message);
        return false;
      }
      setAuthData(signInData);
      await AsyncStorage.setItem('@AuthData', JSON.stringify(signInData));
      return true;
    } catch (error) {
      Alert.alert(error);
      return false;
    }
  };

  /**
   * @description - This function is used to sign up the user
   * @author - Piyush Mehta <me@piyushmehta.com>
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @param {string} first_name
   * @param {string} last_name
   * @param {Date} dob
   * @param {string} phone
   * @return {Promise} - The promise of the request
   */
  const signUp = async (email, password, first_name, last_name, dob, phone) => {
    try {
      const { user: signInData = null, error } = await authService.signUp(email, password);

      if (error) {
        Alert.alert('Error', error.message);
        return false;
      }
      setAuthData(signInData);
      if (signInData) {
        await submitUserData(email, first_name, last_name, dob, phone);
      }
      await AsyncStorage.setItem('@AuthData', JSON.stringify(signInData));
      return true;
    } catch (error) {
      Alert.alert(error);
      return false;
    }
  };
  /**
   * @description - This function is used to sign out the user
   *
   */
  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @description - This function is used to get the auth context
 *
 * @return {*}
 */
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider, useAuth };
