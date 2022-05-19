import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
import { selectSignUp, setSignUp } from "../slices/authSlice";

const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(selectSignUp);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(new Date());

  const onButtonPress = async () => {
    const user = supabase.auth.user();
    if (!user) throw new Error("No user on the session!");

    await supabase
      .from("Users")
      .insert([
        {
          // email,
          // firstName,
          // lastName,
          // dob: dob.toString(),
          // phone,
          email: "me@piyushmehta.com",
          firstName: "Piyush",
          lastName: "Mehta",
          dob: "2020-05-05T00:00:00.000Z",
          phone: "1234567890",
        },
      ])
      .then((res) => {
        Alert.alert("Done");

        if (res.error) {
          Alert.alert(res.error.message);
          setLoading(false);
          return;
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
        setLoading(false);
      });
    dispatch(
      setSignUp({
        email,
        firstName,
        lastName,
        phone,
        dob: dob.toString(),
      })
    );
  };

  return (
    <SafeAreaView>
      <Text style={tw`text-8 p-4 pb-8`}>Promise, this is the last step...</Text>

      <Input
        label="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder="John"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        label="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        placeholder="Doe"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Input
        label="Phone Number"
        leftIcon={{ type: "font-awesome", name: "phone" }}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
        placeholder="(123) 456-7890"
        autoComplete="tel"
        autoCapitalize="none"
      />
      <Text style={tw`text-4 text-gray-500 font-bold pl-3`}>Date of Birth</Text>

      <DateTimePicker
        testID="dateOfBirth"
        accessibilityLabel="dateOfBirth"
        value={dob}
        mode="date"
        is24Hour={false}
        display="default"
        style={{
          padding: 20,
          marginRight: 12,
          flex: 1,
        }}
        onChange={(e) => {
          setDob(new Date(e.nativeEvent.timestamp));
        }}
      />
      <View style={tw`p-3`}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => onButtonPress()}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
