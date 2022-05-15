import React from "react";
import { Image, SafeAreaView, View } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E9E7E4" }}>
      <View style={(tw`p-5`, { backgroundColor: "#E9E7E4" })}>
        <Image
          style={{ height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://i.ibb.co/9YC9DQp/Screen-Shot-2022-05-15-at-3-43-11-PM.png",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
