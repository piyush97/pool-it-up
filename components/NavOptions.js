import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { menuData } from "../constants/menuOptions";
import { selectDestination } from "../slices/navSlice";
const NavOptions = () => {
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  return (
    <FlatList
      style={tw`px-2`}
      data={menuData}
      horizontal
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          // disabled={!destination} //TODO: uncomment this when we are done with dev
          style={tw`p-1 pl-6 pb-8 pt-4 m-2 w-42 `}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View
            style={
              !destination
                ? { backgroundColor: "gray", borderRadius: "10", opacity: 0.4 }
                : {
                    backgroundColor: "#a49774",
                    borderRadius: "10",
                  }
            }
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                marginLeft: 20,
              }}
            />
            <Text style={tw`mt-2 text-lg font-semibold ml-5`}>
              {item.title}
            </Text>
            <Icon
              style={tw`p-2 rounded-full w-10 mt-4 bg-black ml-1 mb-1`}
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
