import React from "react";
import { SafeAreaView, Text } from "react-native";
import tw from "twrnc";
const RideOptionsCard = () => {
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
    </SafeAreaView>
  );
};

export default RideOptionsCard;
