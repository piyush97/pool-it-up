import { Button, Icon, Text, useTheme } from '@rneui/themed';
import { useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NOTIF_APP_ID, NOTIF_APP_TOKEN } from 'react-native-dotenv';
import { notificationTexts } from '../constants/alertsText';
import { PaymentMethods } from '../constants/paymentMethods';
import { NOTIFICATION_INDIE_API } from '../constants/routesConstants';
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
  console.log('RIDE DETAILS', Ride);

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

    await axios
      .post(NOTIFICATION_INDIE_API, {
        subID: Ride.host_id,
        appId: NOTIF_APP_ID,
        appToken: NOTIF_APP_TOKEN,
        title: notificationTexts.notificationTitle,
        message: notificationTexts.notificationMessage,
      })
      .then((res) => {
        console.log(res);
      });
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
