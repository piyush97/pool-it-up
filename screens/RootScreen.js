/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { HOME, TabRoutes } from '../constants/routesConstants';
import { selectIsLoggedIn } from '../slices/authSlice';
import HomeScreen from './HomeScreen';

function RootScreen() {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoggedInState, setIsLoggedIn] = useState(isLoggedIn);
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
  console.log('ISLOGGEDIN STATE', isLoggedInState);
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
    <Tab.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: theme.colors.background,
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
    >
      {TabRoutes.map(({ id, name, component, options }) => (
        <Tab.Screen key={id} name={name} component={component} options={options} />
      ))}
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootScreen;
