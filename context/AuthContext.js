import AsyncStorage from '@react-native-async-storage/async-storage';
import propTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import authService from '../service/authService';

const AuthContext = createContext({});
/**
 * Auth approach by using the AsyncStorage to store the user data
 *
 * @param {object} children - The props passed to the component.
 * @return {React.ReactElement} - Authentication context.
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
function AuthProvider({ children }) {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  async function loadStorageData() {
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

  const signIn = async (email, password) => {
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

  const signUp = async (email, password) => {
    try {
      const { user: signInData = null, error } = await authService.signUp(email, password);
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
}

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
