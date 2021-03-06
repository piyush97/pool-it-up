/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import PlaceInput from '../components/PlaceInput';
import rideTypes from '../constants/ride';
import { HOME } from '../constants/routesConstants';
import { useAuth } from '../context/AuthContext';
import { addNewRide } from '../service/DbService';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';

/**
 * Pool Screen
 * @author Piyush Mehta <me@piyushmehta.com>
 *
 * @return {React.ReactElement} - Pool Screen
 */
const PoolScreen = () => {
  const { theme } = useTheme();
  const {
    authData: { email, id },
  } = useAuth();
  const [carType, setCarType] = React.useState<string>();
  const [carName, setCarName] = React.useState<string>();
  const [carNumber, setCarNumber] = React.useState<string>();
  const [passengers, setPassengers] = React.useState('');
  const [startDateTime, setStartDateTime] = React.useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = React.useState<Date>(new Date());
  const [costPerPassenger, setCostPerPassenger] = React.useState('');
  const [costPerBag, setCostPerBag] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const navigation = useNavigation<NavigationProp<any>>();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);

  const onHandleSubmit = async () => {
    if (
      !carType ||
      !carName ||
      !carNumber ||
      !passengers ||
      !endDateTime ||
      !costPerPassenger ||
      !costPerBag
    ) {
      Alert.alert('Please fill all the fields');
      setDisabled(true);
    } else {
      setDisabled(false);
      !disabled &&
        (await addNewRide({
          car_type: carType,
          car_name: carName,
          car_number: carNumber,
          seats_available: passengers,
          from: origin,
          to: destination,
          host_id: id.toString(),
          title: `Ride with ${carName}`,
          host_email: email.toString(),
          datetime_start: new Date(startDateTime).toISOString(),
          todatetime_end: new Date(endDateTime).toISOString(),
          cost_passenger: costPerPassenger,
          cost_bag: costPerBag,
        }).then((res) => {
          Alert.alert('Done');
          console.log(res);
          navigation.navigate(HOME);
          if (res.error) {
            console.log(res);
            Alert.alert(res.error.message);
          }
        }));
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`p-4 pt-5 pb-8 text-10`}>Ride Details</Text>
      <PlaceInput
        placeholderText={origin?.description || 'From'}
        dispatcherFunction={setOrigin}
        customInputComponent
      />
      <PlaceInput
        placeholderText={destination?.description || 'To'}
        dispatcherFunction={setDestination}
        customInputComponent
      />

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
      <Button title="Submit" style={tw`px-3`} onPress={onHandleSubmit} />
    </SafeAreaView>
  );
};

export default PoolScreen;
