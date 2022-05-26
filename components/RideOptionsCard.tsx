// eslint-disable-next-line import/no-unresolved
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import SEDAN from '../assets/SEDAN.webp';
import SUV from '../assets/SUV.webp';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice';
import { definitions } from '../types/supabase';
import Greeter from '../utils/greeting';

function RideOptionsCard() {
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const { theme } = useTheme();
  const [selected, setSelected] = React.useState<any>(null);
  const { authData } = useAuth();

  const [rides, setRides] = React.useState<definitions['Rides'][]>();
  console.log('selected::::', selected);
  useEffect(() => {
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
  }, [origin, destination]);
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`py-2 text-xl text-center`}>
        {Greeter()},{authData?.first_name}{' '}
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
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({
          item: {
            car_type: carType,
            cost_passenger: price,
            seats_available: availableSeats,
            cost_bag: costPerBag,
            car_number: carNumber,
            title,
            car_name: carModel,
          },
          item,
        }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
          >
            <View style={tw`flex-row p-3 border-b border-gray-200`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl`}>{title}</Text>
                <Image
                  source={carType?.toLowerCase() === 'sedan' ? SEDAN : SUV}
                  style={tw`h-22 w-25`}
                />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl text-right`}>${price}</Text>

                <Text style={tw`text-sm text-right`}>{carType}</Text>
                <Text style={tw`text-sm text-right`}>{carModel}</Text>
                <Text style={tw`text-sm text-right`}>{costPerBag}</Text>
                <Text style={tw`text-sm text-right`}>{carNumber}</Text>
                <Text style={tw`text-sm font-semibold text-right`}>{availableSeats} seats</Text>
              </View>
              <Icon name="chevron-right" size={24} color={theme.colors.primary} />
            </View>
          </TouchableOpacity>
        )}
      />
      <Button onPress={() => {}}>
        <Text>Book Ride</Text>
      </Button>
    </View>
  );
}

export default RideOptionsCard;
