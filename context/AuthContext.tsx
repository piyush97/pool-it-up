/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import authService from '../service/authService';
import dbService from '../service/DbService';
import { AuthContextData } from '../types/env';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
/**
 * Auth approach by using the AsyncStorage to store the user data
 *
 * @param {object} children - The props passed to the component.
 * @return {React.ReactElement} - Authentication context.
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<User | null>();
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
  const signIn = async (email: string, password: string) => {
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
      console.error(error);
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
  const signUp = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    dob: string,
    phone: string
  ) => {
    try {
      const { user: signInData = null, error } = await authService.signUp(email, password);

      if (error) {
        Alert.alert('Error', error.message);
        return false;
      }
      setAuthData(signInData);
      if (signInData) {
        await dbService.submitUserData(email, first_name, last_name, dob, phone);
      }
      await AsyncStorage.setItem('@AuthData', JSON.stringify(signInData));
      return true;
    } catch (error) {
      console.error(error);
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

  /**
   * @description - This function is used to get user details according to email
   * @param {string} email - The email of the user
   * @author - Piyush Mehta <me@piyushmehta.com>
   * @return {*}  {(Promise<definitions['Users'] | boolean>)}
   */
  const userData = async (email: string) => {
    const { data: Users, error } = await dbService.getUserData(email);
    if (error) {
      Alert.alert('Error', error.message);
      return false;
    }
    await AsyncStorage.setItem('@UserData', JSON.stringify(Users[0]));
    return Users[0];
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp, userData }}>
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

export { AuthContext, AuthProvider, useAuth };
