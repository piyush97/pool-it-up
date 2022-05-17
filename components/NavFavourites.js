import { Icon } from "@rneui/base";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const NavFavourites = () => {
  const data = [
    {
      id: 1,
      title: "Home",
      icon: "home",
      location: "Home",
      destination: "401, Sunset Ave, Windsor, ON, N9B 3P4", // hardcoded for now
    },
    {
      id: 2,
      title: "Work",
      icon: "briefcase",
      location: "Work",
      destination: "112, Sunset Ave, Windsor, ON, N9B 3P4", // hardcoded for now
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "gray", height: 0.25 }} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default NavFavourites;
