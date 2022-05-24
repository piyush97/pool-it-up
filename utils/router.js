/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StackRoutes } from '../constants/routesConstants';
import HomeScreens from '../screens/HomeScreens';
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
  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('@isLoggedIn');
        setIsLoggedIn(value);
        if (value !== null) {
          setIsLoggedIn(value);
        }
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };
    getLoginStatus();
    return () => {
      setIsLoggedIn('false');
    };
  }, [setIsLoggedIn]);

  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      {StackRoutes.map(({ id, component, name }) => (
        <Stack.Screen key={id} name={name} component={component} />
      ))}
      <Stack.Screen name="HomeScreen" component={HomeScreens} />
    </Stack.Navigator>
  );
}

export default Router;
