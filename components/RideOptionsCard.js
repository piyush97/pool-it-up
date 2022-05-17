import { GOOGLE_MAPS_APIKEY } from "@env";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";

const RideOptionsCard = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: "1",
      title: "Ride from Piyush",
      price: 45,
      carType: "Sedan",
      image: require("../assets/SEDAN.webp"),
      carModel: "Honda Civic",
      availableSeats: 4,
    },
    {
      id: "2",
      title: "Ride from John",
      price: 55,
      carType: "SUV",
      image: require("../assets/SUV.webp"),
      carModel: "Honda CRV",
      availableSeats: 3,
    },
  ]; // TODO: get data from API
  return (
    <SafeAreaView
      style={tw`bg-white flex-1 border-t border-gray-200 flex-shrink`}
    >
      <Text style={tw`text-center py-5 text-xl`}>
        {new Date().getHours() < 12
          ? "Good Morning"
          : new Date().getHours() > 12 && new Date().getHours() < 18
          ? "Good Afternoon"
          : "Good Evening"}
      </Text>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        onFail={(err) => console.log(err)}
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );
          // dispatch(setDestination(null));
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: tw`bg-gray-100 border-b border-gray-200 p-3 text-black`,
          placeholder: tw`text-black`,
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        placeholder="Where to?"
      />
      <NavFavourites />
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({
            item: {
              id,
              title,
              carType,
              price,
              availableSeats,
              image,
              carModel,
            },
          }) => (
            <TouchableOpacity onPress={() => {}}>
              <View style={tw`flex-row bg-white border-b border-gray-200 p-3`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xl`}>{title}</Text>
                  <Text style={tw`text-gray-600`}>{carType}</Text>
                  <Text style={tw`text-gray-600 `}>{carModel}</Text>
                  <Text style={tw`text-gray-600 font-semibold`}>
                    {availableSeats} seats
                  </Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xl`}>${price}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Image source={image} style={tw`h-32 w-35`} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
