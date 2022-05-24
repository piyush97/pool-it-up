import { Icon } from '@rneui/themed';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PoolScreen from '../screens/PoolScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RootScreen from '../screens/RootScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export const ROOT_SCREEN = 'Root';
export const HOME = 'Home';
export const GET_A_RIDE = 'GetARide';
export const PROFILE = 'Profile';
export const SIGN_IN = 'SignIn';
export const SIGN_UP = 'SignUp';
export const FORGOT_PASSWORD = 'ForgotPassword';
export const ONBOARDING = 'Onboarding';
export const POOL_MY_RIDE = 'PoolMyRide';

export const TabRoutes = [
  {
    id: 1,
    component: HomeScreen,
    name: HOME,
    options: {
      tabBarLabel: HOME,
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={size} type="font-awesome" />
      ),
    },
  },
  {
    id: 2,
    component: MapScreen,
    name: GET_A_RIDE,
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
    name: POOL_MY_RIDE,
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
    name: PROFILE,
    options: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <Icon name="user" color={color} size={size} type="font-awesome" />
      ),
    },
  },
];

export const StackProtectedRoutes = [
  {
    id: 1,
    component: RootScreen,
    name: ROOT_SCREEN,
  },
  {
    id: 2,
    component: HomeScreen,
    name: HOME,
  },

  {
    id: 3,
    component: OnboardingScreen,
    name: ONBOARDING,
  },
];

export const StackUnProtectedRoutes = [
  {
    id: 1,
    component: SignInScreen,
    name: SIGN_IN,
  },
  {
    id: 2,
    component: SignUpScreen,
    name: SIGN_UP,
  },
  {
    id: 3,
    component: OnboardingScreen,
    name: ONBOARDING,
  },
  {
    id: 4,
    component: ForgotPasswordScreen,
    name: FORGOT_PASSWORD,
  },
  {
    id: 4,
    component: HomeScreen,
    name: HOME,
  },
  {
    id: 5,
    component: RootScreen,
    name: ROOT_SCREEN,
  },
];
