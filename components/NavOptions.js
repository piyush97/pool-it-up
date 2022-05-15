import { Icon } from "@rneui/base";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { menuData } from "../constants/menuOptions";
const NavOptions = () => {
  return (
    <FlatList
      style={tw`px-2`}
      data={menuData}
      horizontal
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`p-1 pl-6 pb-8 pt-4 m-2 w-40 `}>
          <View style={{ backgroundColor: "#a49774", borderRadius: "10" }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 rounded-full w-10 mt-4 bg-black`}
              type="antdesign"
              color="#fff"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
