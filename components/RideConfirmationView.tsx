import { Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import dbService from '../service/DbService';
import { RideConfirmationViewProps } from '../types/env';

const RideConfirmationView = ({ selected }: RideConfirmationViewProps) => {
  const { theme } = useTheme();
  const { getRideData } = dbService;
  const [rideDetails, setRideDetails] = React.useState<any>();
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
      {/* <Image style={{ width: '100%', height: '100%' }} /> */}
      <Text>{JSON.stringify(rideDetails, null, 4)}</Text>
    </SafeAreaView>
  );
};

export default RideConfirmationView;
