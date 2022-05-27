// eslint-disable-next-line import/no-unresolved
import { Icon } from '@rneui/base';
import { Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
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
/**
 * @description - Ride options card Shows list of rides available
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @return {React.ReactElement} - Ride options card
 */
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
        flex: 1,
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
          style: {
            fontSize: 18,
            color: theme.colors.black,
            flex: 1,
            padding: 20,
            borderRadius: 10,
            marginVertical: 5,
            backgroundColor: theme.colors.grey2,
            marginHorizontal: 20,
          },
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
          placeholder: theme.colors.black,
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: 'country:ca',
        }}
        placeholder="Where from?"
      />
      <TouchableOpacity
        style={{
          right: 'auto',
          top: 0,
          marginRight: 'auto',
          left: 50,
        }}
      >
        <Icon
          style={{ top: 2, right: 2 }}
          type="font-awesome"
          name="arrow-up"
          size={12}
          color={theme.colors.primary}
        />
        <Icon
          style={{ bottom: 2, left: 2 }}
          type="font-awesome"
          name="arrow-down"
          size={12}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        // eslint-disable-next-line no-console
        fetchDetails
        enableHighAccuracyLocation
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        textInputProps={{
          style: {
            fontSize: 18,
            color: theme.colors.black,
            flex: 1,
            borderRadius: 10,
            padding: 20,
            marginVertical: 5,
            backgroundColor: theme.colors.grey2,
            marginHorizontal: 20,
          },
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
            bags_available: bagsAvailable,
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
            bags_available={bagsAvailable}
          />
        )}
      />
    </View>
  );
}

export default RideOptionsCard;
