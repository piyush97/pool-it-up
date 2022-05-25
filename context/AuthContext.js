import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
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
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        // If there are data, it's converted to an Object and the state is updated.
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
    const signInData = await authService.signIn(email, password);

    setAuthData(signInData);

    AsyncStorage.setItem('@AuthData', JSON.stringify(signInData));
  };

  const signUp = async (email, password) => {
    const signUpData = await authService.signUp(email, password);
    setAuthData(signUpData);
    AsyncStorage.setItem('@AuthData', JSON.stringify(signUpData));
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

export { AuthContext, AuthProvider, useAuth };
