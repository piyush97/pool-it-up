// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_APIKEY } from '@env';
import { Input } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import SEDAN from '../assets/SEDAN.webp';
import SUV from '../assets/SUV.webp';
import supabase from '../lib/supabase';
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice';
import Greeter from '../utils/greeting';
import NavFavourites from './NavFavourites';

function RideOptionsCard() {
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);

  const [selected, setSelected] = React.useState(null);

  const [rides, setRides] = React.useState([]);
  useEffect(() => {
    const fetchRides = async () => {
      const { data: Rides, error } = await supabase
        .from('Rides')
        .select('*')
        .eq('from', JSON.stringify(origin))
        .eq('to', JSON.stringify(destination));

      setRides(Rides);
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchRides();
  }, [origin, destination]);
  return (
    <SafeAreaView style={tw`bg-white flex-1 border-t border-gray-200 flex-shrink`}>
      <Text style={tw`text-center py-2 text-xl`}>{Greeter()}</Text>
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
              location: details.geometry.location,
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
          placeholder: tw`text-black`,
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        placeholder="Where to?"
      />
      <NavFavourites />
      {/* <Text>{JSON.stringify(rides, null, 4)}</Text> */}
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
            // style={tw`flex-row justify-between items-center ${
            //   id === selected?.id && "bg-gray-900"
            // }`}
          >
            <View style={tw`flex-row bg-white border-b border-gray-200 p-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl`}>{title}</Text>
                <Image
                  source={carType.toLowerCase() === 'sedan' ? SEDAN : SUV}
                  style={tw`h-22 w-25`}
                />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl text-right`}>${price}</Text>

                <Text style={tw`text-sm text-gray-600 text-right`}>{carType}</Text>
                <Text style={tw`text-sm text-gray-600 text-right`}>{carModel}</Text>
                <Text style={tw`text-sm text-gray-600 text-right`}>{costPerBag}</Text>
                <Text style={tw`text-sm text-gray-600 text-right`}>{carNumber}</Text>
                <Text style={tw`text-sm text-gray-600 font-semibold text-right`}>
                  {availableSeats} seats
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            {!selected ? 'Select a Ride' : selected?.id && `You selected ${selected.title}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RideOptionsCard;
