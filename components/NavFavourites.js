import { Icon } from "@rneui/base";
import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
const NavFavourites = () => {
  const [favData, setFavData] = React.useState([]);
  const data = [
    {
      id: 1,
      title: "Home",
      icon: "home",
      type: "Home",
      destination: "401, Sunset Ave, Windsor, ON, N9B 3P4", // hardcoded for now
    },
    {
      id: 2,
      title: "Work",
      icon: "briefcase",
      type: "Work",
      destination: "112, Sunset Ave, Windsor, ON, N9B 3P4", // hardcoded for now
    },
  ];

  useEffect(() => {
    async () => {
      await supabase
        .from("Favourites")
        .select("*")
        .then((res) => {
          console.log("res", res);
          setFavData(res);
        });
    };
  }, [favData]);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "gray", height: 0.25 }} />
      )}
      renderItem={({ item: { type, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{type}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default NavFavourites;
