/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PoolScreen from '../screens/PoolScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
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
  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('@isLoggedIn');
        console.log('value', value);
        setIsLoggedIn(value);
        if (value !== null) {
          // value previously stored
          console.log('value was', value);
        }
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };
    getLoginStatus();
  }, []);

  if (isLoggedIn.valueOf() === 'true') {
    return (
      <>
        <Tab.Navigator
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
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} type="font-awesome" />
              ),
            }}
          />
          {destination && (
            <>
              <Tab.Screen
                name="GetARide"
                component={MapScreen}
                options={{
                  tabBarLabel: 'Get A Ride',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="map" color={color} size={size} type="font-awesome" />
                  ),
                }}
              />
              <Tab.Screen
                name="PoolMyRide"
                component={PoolScreen}
                options={{
                  tabBarLabel: 'Pool My Ride',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="car" color={color} size={size} type="font-awesome" />
                  ),
                }}
              />
            </>
          )}
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="user" color={color} size={size} type="font-awesome" />
              ),
            }}
          />
        </Tab.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
          title: 'Sign in',
          animationTypeForReplace: isSignout ? 'pop' : 'push',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerShown: false,
        }}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUpScreen}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Router;
