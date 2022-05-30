/* eslint-disable react/prop-types */
import { Icon } from '@rneui/themed';
import React from 'react';
type IconProps = {
  color: string;
  size: number;
};
export const HOME = 'Home';
export function HOME_ICON({ color, size }: IconProps) {
  return <Icon name="home" color={color} size={size} type="font-awesome" />;
}

export const GET_A_RIDE = 'GetARide';
export function GET_A_RIDE_ICON({ color, size }: IconProps) {
  return <Icon name="map" color={color} size={size} type="font-awesome" />;
}
export const PROFILE = 'Profile';
export function PROFILE_ICON({ color, size }: IconProps) {
  return <Icon name="user" color={color} size={size} type="font-awesome" />;
}
export const POOL_MY_RIDE = 'PoolMyRide';
export function POOL_MY_RIDE_ICON({ color, size }: IconProps) {
  return <Icon name="taxi" color={color} size={size} type="font-awesome" />;
}
export const MY_RIDES = 'MyRides';
export function MY_RIDES_ICON({ color, size }: IconProps) {
  return <Icon name="list" color={color} size={size} type="font-awesome-5" />;
}
export const SIGN_IN = 'SignIn';
export const SIGN_UP = 'SignUp';
export const FORGOT_PASSWORD = 'ForgotPassword';
export const ONBOARDING = 'Onboarding';
