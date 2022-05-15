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
        <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 m-2 w-40`}>
          <View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
