import { Button, Text, useTheme } from '@rneui/themed';
import { CardField, CardFieldInput, useConfirmPayment } from '@stripe/stripe-react-native';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
type StripePaymentViewProps = {
  email: string;
};
const StripePaymentView = ({ email }: StripePaymentViewProps) => {
  const [cardDetails, setCardDetails] = React.useState<CardFieldInput.Details>();
  const { confirmPayment, loading } = useConfirmPayment();
  const { theme } = useTheme();

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
          billingDetails: email,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert('Payment Successful');
          console.log('Payment successful ', paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
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
      <Button onPress={handlePayment} title="Pay" disabled={loading} />
    </SafeAreaView>
  );
};

export default StripePaymentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },

  cardContainer: {
    // height: 50,
    width: '100%',
    marginVertical: 30,
  },
});
