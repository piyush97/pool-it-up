import { GOOGLE_MAPS_APIKEY } from "@env";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";

const RideOptionsCard = () => {
  const dispatch = useDispatch();

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
          textInput: {
            fontSize: 18,
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        placeholder="Where to?"
      />
      <NavFavourites />
    </SafeAreaView>
  );
};

export default RideOptionsCard;
