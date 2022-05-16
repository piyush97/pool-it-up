import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import Map from "../components/Map";
const MapScreen = () => {
  return (
    <View>
      <View style={tw`h-2/3`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}></View>
    </View>
  );
};

export default MapScreen;
