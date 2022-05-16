import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

const MapScreen = () => {
  return (
    <View>
      <Text>MapScreen</Text>
      <View style={tw`h-1/2`}></View>
      <View style={tw`h-1/2`}></View>
    </View>
  );
};

export default MapScreen;
