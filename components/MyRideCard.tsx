import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { definitions } from '../types/supabase';

const MyRideCard = ({ id, car_type: carType }: definitions['Rides']) => {
  return <SafeAreaView>{carType}</SafeAreaView>;
};

export default MyRideCard;
