/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  HOME,
  SIGN_IN,
  StackProtectedRoutes,
  StackUnProtectedRoutes,
} from '../constants/routesConstants';

function Router() {
  const Stack = createNativeStackNavigator();
  const { theme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState('false');
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
  console.log('IsLOGGEDIN', isLoggedIn);
  return isLoggedIn === 'true' ? (
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
