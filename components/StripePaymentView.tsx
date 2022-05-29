import { Button, Icon, Text, useTheme } from '@rneui/themed';
import { CardField, CardFieldInput, useConfirmPayment } from '@stripe/stripe-react-native';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { PaymentMethods } from '../constants/paymentMethods';
import dbService from '../service/DbService';
type StripePaymentViewProps = {
  selected: string;
  email: string;
  modalButton: any;
  Ride: any;
};
const StripePaymentView = ({ selected, email, modalButton, Ride }: StripePaymentViewProps) => {
  const [cardDetails, setCardDetails] = React.useState<CardFieldInput.Details>();
  const { confirmPayment, loading } = useConfirmPayment();
  const { theme } = useTheme();
  const { paymentRecord } = dbService;

  const recordPayment = async (paymentMethod: string) => {
    const data = await paymentRecord(email, selected, paymentMethod, Ride);
    if (data.error) {
      console.log(data.error);
    }
    console.log(data);
  };

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Please enter complete card details');
      return;
    }
    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(`http://localhost:3000/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log('Unable to process payment');
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: 'Card',
        });
        if (error) {
          Alert.alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert('Payment Successful');
          console.log('Payment successful ', paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Icon type="font-awesome" name="cross" onPress={() => modalButton(false)} />
      <Text>StripePaymentView</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{ backgroundColor: theme.colors.grey2 }}
        style={{ height: 80 }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button
        onPress={handlePayment}
        style={{ padding: 25 }}
        title="Card Payment"
        disabled={loading}
      />
      <Button
        onPress={() => recordPayment(PaymentMethods.CASH)}
        style={{ padding: 25 }}
        title="Cash Payment"
        disabled={loading}
      />
    </SafeAreaView>
  );
};

export default StripePaymentView;
