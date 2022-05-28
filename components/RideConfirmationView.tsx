import { Button, Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { Image, Modal, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { carImageProvider } from '../constants/fetchDetails';
import dbService from '../service/DbService';
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
      const data = await getRideData('a1879470-dbb6-451e-941d-0065e74614ce'); //TODO: remove this hardcoded id [only for testing]
      if (data.error) {
        console.log(data.error);
      }
      console.log(data);
      setRideDetails(data.data);
    };
    getRideDataDetails();
  }, [selected]);
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-xl font-bold text-center `}>{rideDetails?.title}</Text>
      <Image
        style={{ width: '80%', height: '25%' }}
        source={carImageProvider(rideDetails?.car_type)}
      />
      <FromTo from={rideDetails?.from?.description} to={rideDetails?.to?.description} />
      {/* <Text>{JSON.stringify(rideDetails, null, 4)}</Text> */}
      <Button
        title="Confirm"
        style={{ ...tw`p-3 pt-5` }}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <StripePaymentView email={'me@piyushmehta.com'} />
      </Modal>
    </SafeAreaView>
  );
};

export default RideConfirmationView;
