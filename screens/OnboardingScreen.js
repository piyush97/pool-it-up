import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import supabase from '../lib/supabase';

function OnboardingScreen() {
  const { theme } = useTheme();

  // eslint-disable-next-line no-console
  // console.log('data', user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(new Date());
  const { email, id } = {}; // TODO: get from context
  const navigation = useNavigation();
  const onButtonPress = async () => {
    // const user = await supabase.auth.user(); // get the current user
    // if (!user) throw new Error('No user on the session!'); // TODO: handle this error
    await supabase
      .from('Users')
      .insert([
        {
          id,
          email,
          first_name: firstName,
          last_name: lastName,
          dob: dob.toISOString(),
          phone,
        },
      ])
      .then(async (res) => {
        Alert.alert('Done');
        navigation.navigate(ROOT_SCREEN);
        // TODO: handle this from context
        await AsyncStorage.setItem('@isLoggedIn', 'true');

        if (res.error) {
          Alert.alert(res.error.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
        setLoading(false);
      });
    // dispatch(
    //   setSignUp({
    //     // eslint-disable-next-line no-undef
    //     email, // TODO: do from Context
    //     firstName,
    //     lastName,
    //     phone,
    //     dob: dob.toString(),
    //   })

    // );
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>User Details</Text>
      <Input
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder="First Name"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
        placeholder="Phone Number"
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
        themeVariant="dark"
        style={{
          padding: 20,
          marginRight: 12,

          flex: 0,
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
