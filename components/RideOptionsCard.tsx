// eslint-disable-next-line import/no-unresolved
import { Button, Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import SEDAN from '../assets/SEDAN.webp';
import SUV from '../assets/SUV.webp';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { definitions } from '../types/supabase';
import Greeter from '../utils/greeting';
import RideCard from './RideCard';

function RideOptionsCard() {
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const { theme } = useTheme();
  const [selected, setSelected] = React.useState<any>(null);
  const { authData, userData } = useAuth();

  const [rides, setRides] = React.useState<definitions['Rides'][]>();
  const { email = null } = authData;
  const [dataOfUser, setDataOfUser] = React.useState<definitions['Users']>();
  useEffect(() => {
    const getUserData = async () => {
      const data = await userData(email);
      setDataOfUser(data && data);
    };
    const fetchRides = async () => {
      const { data: Rides, error } = await supabase
        .from<definitions['Rides']>('Rides')
        .select('*')
        .eq('from', JSON.stringify(origin))
        .eq('to', JSON.stringify(destination));

      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      // @ts-ignore - TODO: fix this
      setRides(Rides);
    };
    fetchRides();
    getUserData();
  }, [origin, destination]);
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`py-2 text-xl text-center`}>
        {Greeter()}
        {dataOfUser && `, ${dataOfUser?.first_name} ${dataOfUser?.last_name}`}
      </Text>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        // eslint-disable-next-line no-console
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
          dispatch(
            setOrigin({
              location: details?.geometry.location,
              description: data.description,
            })
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: 'transparent',
          },
          placeholder: theme.colors.black,
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
        // eslint-disable-next-line no-console
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
          dispatch(
            setDestination({
              location: details?.geometry.location,
              description: data.description,
            })
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: 'transparent',
          },
          placeholder: theme.colors.black,
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        placeholder="Where to?"
      />
      {/* TODO: Write logic for Db */}
      {/* <NavFavourites /> */}
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        horizontal={true}
        onEndReachedThreshold={0.5}
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({
          item: {
            id,
            car_type: carType,
            cost_passenger: price,
            seats_available: availableSeats,
            cost_bag: costPerBag,
            car_number: carNumber,
            car_name: carModel,
          },
          item,
        }) => (
          <RideCard
            setSelected={setSelected}
            carType={carType}
            price={price}
            selected={selected}
            costPerBag={costPerBag}
            carNumber={carNumber}
            availableSeats={availableSeats}
            item={item}
            SEDAN={SEDAN}
            SUV={SUV}
            carModel={carModel}
            id={id}
            theme={theme}
          />
        )}
      />
      <Button title="Add Ride"></Button>
    </View>
  );
}

export default RideOptionsCard;
