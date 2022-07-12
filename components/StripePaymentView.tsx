import { Button, Icon, Text, useTheme } from '@rneui/themed';
import { useConfirmPayment } from '@stripe/stripe-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { PaymentMethods } from '../constants/paymentMethods';
import { useAuth } from '../context/AuthContext';
import dbService, { getRideData } from '../service/DbService';
type StripePaymentViewProps = {
  selected: string;
  email: string;
  modalButton: any;
  Ride: any;
};
const StripePaymentView = ({ selected, email, modalButton, Ride }: StripePaymentViewProps) => {
  const [rideDetails, setRideDetails] = React.useState();
  const { authData } = useAuth();
  const { id = null } = authData;

  const { confirmPayment, loading } = useConfirmPayment();
  const { theme } = useTheme();
  const { paymentRecord } = dbService;

  console.log('AUTHHHH', authData);

  useEffect(() => {
    const getRideDataDetails = async () => {
      const data = await getRideData(selected);
      if (data.error) {
        console.log(data.error);
      }
      setRideDetails(data.data);
    };
    getRideDataDetails();
  }, []);

  const recordPayment = async (paymentMethod: string) => {
    const data = await paymentRecord(id, email, selected, paymentMethod, Ride);
    if (data.error) {
      console.log(data.error);
    }
    console.log(data);
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Icon type="font-awesome" name="minus" onPress={() => modalButton(false)} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '5%',
          marginBottom: '5%',
        }}
      >
        Please pay {rideDetails?.cost_passenger} to the driver
      </Text>

      <Button
        onPress={() => recordPayment(PaymentMethods.CASH)}
        style={{ padding: 25 }}
        title="Confirm Ride"
        disabled={loading}
      />
    </SafeAreaView>
  );
};

export default StripePaymentView;
