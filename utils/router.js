/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  HOME,
  SIGN_IN,
  StackProtectedRoutes,
  StackUnProtectedRoutes,
} from '../constants/routesConstants';
import { selectIsLoggedIn } from '../slices/authSlice';
// import { selectIsLoggedIn } from '../slices/authSlice';
import { selectDestination } from '../slices/navSlice';

function Router() {
  const Stack = createNativeStackNavigator();
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  const isSignout = false;
  const destination = useSelector(selectDestination);
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  const isLoggedInState = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLoginStatus = async () => {
      setLoading(true);
      try {
        await AsyncStorage.getItem('@isLoggedIn').then((value) => {
          setIsLoggedIn(value);
          setLoading(false);
        });
      } catch (e) {
        // error reading value
        console.error(e);
        setLoading(false);
      }
    };

    getLoginStatus();
    return () => {
      setIsLoggedIn('false');
    };
  }, [setIsLoggedIn, setLoading]);
  if (loading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          height: '100%',
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return isLoggedInState === 'true' ? (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
      }}
      initialRouteName={HOME}
      screenOptions={{
        headerShown: false,
      }}
    >
      {StackProtectedRoutes.map(({ id, component, name }) => (
        <Stack.Screen key={id} name={name} component={component} />
      ))}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName={SIGN_IN}
      defaultScreenOptions={{
        headerShown: false,
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      {StackUnProtectedRoutes.map(({ id, component, name }) => (
        <Stack.Screen key={id} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}

export default Router;
