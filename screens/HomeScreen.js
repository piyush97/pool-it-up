import { GOOGLE_MAPS_APIKEY } from "@env";
import React from "react";
import { Image, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E9E7E4" }}>
      <SafeAreaView style={(tw`p-5`, { backgroundColor: "#E9E7E4" })}>
        <Image
          style={{ height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://i.ibb.co/9YC9DQp/Screen-Shot-2022-05-15-at-3-43-11-PM.png",
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          onFail={(err) => console.log(err)}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          placeholder="Where from?"
        />
        <NavOptions />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
