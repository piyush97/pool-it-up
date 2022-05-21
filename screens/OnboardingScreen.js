import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import supabase from '../lib/supabase';
import { selectUser, setSignUp } from '../slices/authSlice';

function OnboardingScreen() {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const user = useSelector(selectUser);

  // eslint-disable-next-line no-console
  console.log('data', user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(new Date());

  const onButtonPress = async () => {
    // const user = supabase.auth.user(); // TODO: NEED FIX returns the current user
    // if (!user) throw new Error("No user on the session!"); // TODO: handle this error

    await supabase
      .from('Users')
      .insert([
        {
          // email,
          // firstName,
          // lastName,
          // dob: dob.toString(),
          // phone,
          email: 'me@piyushmehta.com', // TODO: remove this
          firstName: 'Piyush', // TODO: remove this
          lastName: 'Mehta', // TODO: remove this
          dob: '2020-05-05T00:00:00.000Z', // TODO: remove this
          phone: '1234567890', // TODO: remove this
        },
      ])
      .then((res) => {
        Alert.alert('Done');

        if (res.error) {
          Alert.alert(res.error.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
        setLoading(false);
      });
    dispatch(
      setSignUp({
        // eslint-disable-next-line no-undef
        email, // TODO: retreive from database
        firstName,
        lastName,
        phone,
        dob: dob.toString(),
      })
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-8 p-4 pb-8`}>Promise, this is the last step...</Text>
      <Input
        label="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder="John"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        label="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        placeholder="Doe"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        label="Phone Number"
        leftIcon={{ type: 'font-awesome', name: 'phone' }}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
        placeholder="(123) 456-7890"
        autoComplete="tel"
        autoCapitalize="none"
      />
      <Text style={tw`text-4 text-gray-500 font-bold pl-3`}>Date of Birth</Text>

      <DateTimePicker
        testID="dateOfBirth"
        accessibilityLabel="dateOfBirth"
        value={dob}
        mode="date"
        is24Hour={false}
        display="default"
        style={{
          padding: 20,
          marginRight: 12,
          flex: 1,
        }}
        onChange={(e) => {
          setDob(new Date(e.nativeEvent.timestamp));
        }}
      />
      <View style={tw`p-3`}>
        <Button title="Sign up" disabled={loading} onPress={() => onButtonPress()} />
      </View>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
