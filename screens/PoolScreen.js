/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import rideTypes from '../constants/ride';
import { HOME } from '../constants/routesConstants';
import supabase from '../lib/supabase';
import { selectDestination, selectOrigin } from '../slices/navSlice';

function PoolScreen() {
  const { theme } = useTheme();

  const [carType, setCarType] = React.useState('');
  const [carName, setCarName] = React.useState('');
  const [carNumber, setCarNumber] = React.useState('');
  const [passengers, setPassengers] = React.useState('');
  const [startDateTime, setStartDateTime] = React.useState(new Date());
  const [endDateTime, setEndDateTime] = React.useState(new Date());
  const [costPerPassenger, setCostPerPassenger] = React.useState('');
  const [costPerBag, setCostPerBag] = React.useState('');
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);

  const onHandleSubmit = async () => {
    await supabase
      .from('Rides')
      .insert([
        {
          car_type: carType,
          car_name: carName,
          car_number: carNumber,
          seats_available: passengers,
          from: origin,
          to: destination,
          host_id: '', // TODO: get from context
          title: `Ride with ${carName}`,
          host_email: '', // TODO: get from context
          datetime_start: startDateTime.toISOString(),
          todatetime_end: endDateTime.toISOString(),
          cost_passenger: costPerPassenger,
          cost_bag: costPerBag,
        },
      ])
      .then((res) => {
        Alert.alert('Done');
        console.log(res);
        navigation.navigate(HOME);
        if (res.error) {
          console.log(res);
          Alert.alert(res.error.message);
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-5`}>Ride Details</Text>
      <Input
        placeholder="Car Number"
        value={carNumber}
        onChangeText={(text) => setCarNumber(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Car Name"
        value={carName}
        onChangeText={(text) => setCarName(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Passengers required"
        value={passengers}
        onChangeText={(text) => setPassengers(text)}
        style={tw`p-2`}
        keyboardType="number-pad"
      />

      {/* <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        onFail={(err) => console.log(err)}
        fetchDetails
        enableHighAccuracyLocation
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: Input,
          errorStyle: { color: 'red' },
        }}
        onPress={(data, details = null) => {
          setFrom({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
            backgroundColor: 'transparent',
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        placeholder="Where from?"
      />
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        onFail={(err) => console.log(err)}
        fetchDetails
        enableHighAccuracyLocation
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: Input,
          errorStyle: { color: 'red' },
        }}
        onPress={(data, details = null) => {
          setTo({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
            backgroundColor: 'transparent',
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        placeholder="Where to?"
      /> */}
      <Picker
        selectedValue={carType}
        itemStyle={{
          color: theme.colors.black,
          fontSize: 16,
          fontWeight: 'bold',
          height: 40,
          margin: 10,
        }}
        onValueChange={(itemValue) => setCarType(itemValue)}
      >
        <Picker.Item label="Select Car Type" value="" />
        {rideTypes.map(({ id, name }) => (
          <Picker.Item key={id} label={name} value={name} />
        ))}
      </Picker>
      <Text style={{ height: 18, marginLeft: 12, padding: 1, color: theme.colors.grey1 }}>
        Date and Time of the Journey Starts:{' '}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={startDateTime}
        mode="datetime"
        is24Hour={false}
        themeVariant="dark"
        textColor={theme.colors.black}
        display="default"
        style={tw`p-2 mt-2 mr-4 `}
        onChange={(e) => {
          setStartDateTime(new Date(e.nativeEvent.timestamp));
        }}
      />
      <Text style={{ height: 18, marginLeft: 12, padding: 1, color: theme.colors.grey1 }}>
        {' '}
        Date and Time of the Journey Ends:{' '}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={endDateTime}
        mode="datetime"
        textColor={theme.colors.black}
        themeVariant="dark"
        is24Hour={false}
        display="default"
        style={tw`p-2 mt-2 mr-4`}
        onChange={(e) => {
          setEndDateTime(new Date(e.nativeEvent.timestamp));
        }}
      />
      <Input
        placeholder="Cost per Passenger"
        keyboardType="decimal-pad"
        leftIcon={<Icon type="font-awesome" name="dollar" size={24} color={theme.colors.grey1} />}
        value={costPerPassenger}
        onChangeText={(text) => setCostPerPassenger(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Cost per checkin bag"
        keyboardType="number-pad"
        leftIcon={<Icon type="font-awesome" name="dollar" size={24} color={theme.colors.grey1} />}
        value={costPerBag}
        onChangeText={(text) => setCostPerBag(text)}
        style={tw`p-2`}
      />
      <Button title="Submit" style={tw`px-3`} onPress={() => onHandleSubmit()} />
    </SafeAreaView>
  );
}

export default PoolScreen;
