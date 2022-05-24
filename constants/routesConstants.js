import { Icon } from '@rneui/themed';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PoolScreen from '../screens/PoolScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export const TabRoutes = [
  {
    id: 1,
    component: HomeScreen,
    name: 'Home',
    options: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={size} type="font-awesome" />
      ),
    },
  },
  {
    id: 2,
    component: MapScreen,
    name: 'GetARide',
    options: {
      tabBarLabel: 'Get A Ride',
      tabBarIcon: ({ color, size }) => (
        <Icon name="map" color={color} size={size} type="font-awesome" />
      ),
    },
  },
  {
    id: 3,
    component: PoolScreen,
    name: 'PoolMyRide',
    options: {
      tabBarLabel: 'Pool My Ride',
      tabBarIcon: ({ color, size }) => (
        <Icon name="car" color={color} size={size} type="font-awesome" />
      ),
    },
  },
  {
    id: 4,
    component: ProfileScreen,
    name: 'Profile',
    options: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <Icon name="user" color={color} size={size} type="font-awesome" />
      ),
    },
  },
];

export const StackRoutes = [
  {
    id: 1,
    component: SignInScreen,
    name: 'SignIn',
  },
  {
    id: 2,
    component: SignUpScreen,
    name: 'SignUp',
  },
  {
    id: 3,
    component: OnboardingScreen,
    name: 'Onboarding',
  },
  {
    id: 4,
    component: ForgotPasswordScreen,
    name: 'ForgotPassword',
  },
];
