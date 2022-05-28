import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@rneui/themed';
import React from 'react';
import {
  GET_A_RIDE,
  GET_A_RIDE_ICON,
  HOME,
  HOME_ICON,
  POOL_MY_RIDE,
  POOL_MY_RIDE_ICON,
  PROFILE,
  PROFILE_ICON,
} from '../../constants/routesConstants';
import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import PoolScreen from '../../screens/PoolScreen';
import ProfileScreen from '../../screens/ProfileScreen';

/**
 * @description - Unprotected Routes for the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @returns {StackNavigator} - Unprotected Routes for the application
 */
function AppStack() {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  return (
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
        name={HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: HOME,
          tabBarIcon: HOME_ICON,
        }}
      />
      <Tab.Screen
        name={GET_A_RIDE}
        component={MapScreen}
        options={{
          tabBarLabel: GET_A_RIDE,
          tabBarIcon: GET_A_RIDE_ICON,
        }}
      />
      <Tab.Screen
        name={POOL_MY_RIDE}
        component={PoolScreen}
        options={{
          tabBarLabel: POOL_MY_RIDE,
          tabBarIcon: POOL_MY_RIDE_ICON,
        }}
      />
      <Tab.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: PROFILE,
          tabBarIcon: PROFILE_ICON,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
