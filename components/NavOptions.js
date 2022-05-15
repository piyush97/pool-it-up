import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { menuData } from "../constants/menuOptions";
const NavOptions = () => {
  return (
    <FlatList
      style={tw`px-2`}
      data={menuData}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`px-1`}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
