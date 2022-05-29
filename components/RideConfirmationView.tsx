import { Button, Icon, Text, Tooltip, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Modal, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import { carImageProvider } from '../constants/fetchDetails';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import dbService, { getUserData } from '../service/DbService';
import { RideConfirmationViewProps } from '../types/env';
import FromTo from './FromTo';
import StripePaymentView from './StripePaymentView';

/**
 * @description - Ride Confirmation View
 * @param {RideConfirmationViewProps} props - RideConfirmationViewProps
 * @return {React.ReactElement} - The Ride Confirmation View
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const RideConfirmationView = ({ selected }: RideConfirmationViewProps) => {
  const { theme } = useTheme();
  const { getRideData } = dbService;
  const [rideDetails, setRideDetails] = React.useState<any>();
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const getRideDataDetails = async () => {
      const data = await getRideData(selected);
      if (data.error) {
        console.log(data.error);
      }
      console.log(data);
      setRideDetails(data.data);
    };
    getRideDataDetails();
  }, [selected]);
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '120%' }}>
      <Text style={tw`text-xl font-bold text-center pt-2`}>{rideDetails?.title}</Text>
      <Image
        style={{ width: '80%', height: '25%', alignSelf: 'center', left: '5%' }}
        source={carImageProvider(rideDetails?.car_type)}
      />
      <FromTo
        from={rideDetails?.from?.description}
        to={rideDetails?.to?.description}
        startDateTime={rideDetails?.datetime_start}
        endDateTime={rideDetails?.todatetime_end}
      />
      <View
        style={{
          left: '2%',
          top: '8%',
          alignSelf: 'flex-start',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <Icon name="user" type="font-awesome" />
        <Text style={{ left: '10%', top: '1%' }}>
          Seats Available: {rideDetails?.seats_available}
        </Text>
      </View>
      <View
        style={{
          left: '2%',
          top: '5%',
          flex: 0.75,
          alignSelf: 'flex-start',
          flexDirection: 'row',
        }}
      >
        <Icon type="font-awesome" name="suitcase" />
        <Text style={{ ...tw`text-md `, left: '10%', top: '1%' }}>
          Price per bag: {rideDetails?.cost_bag}
        </Text>
      </View>
      <View
        style={{
          left: '2%',
          top: '5%',
          flex: 9,
          alignSelf: 'flex-start',
          flexDirection: 'row',
        }}
      >
        <Icon type="font-awesome" name="dollar" />
        <Text style={{ ...tw`text-md `, left: '2%', top: '1%' }}>
          Price per seat: {rideDetails?.cost_passenger}
        </Text>
        <Button
          title="Confirm"
          style={{ ...tw`p-3 mt-15 ml-3` }}
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        {/* TODO: Remove this harcoded Text */}
        <StripePaymentView
          email={'me@piyushmehta.com'}
          modalButton={setShowModal}
          selected={selected}
          Ride={rideDetails}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default RideConfirmationView;
