import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import tw from "twrnc";
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-red-800`}>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
