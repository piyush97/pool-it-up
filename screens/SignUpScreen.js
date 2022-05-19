import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
import {
  selectSignUp,
  selectUserToken,
  setSignUp,
  setUserToken,
} from "../slices/authSlice";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(new Date());
  const dispatch = useDispatch();
  const signUp = useSelector(selectSignUp);
  const userId = useSelector(selectUserToken);

  async function signUpWithEmail() {
    // checkForm(email, firstName, lastName, phone, password, dob);
    setLoading(true);
    const { error } = await supabase.auth
      .signUp({ email, password })
      .then((res) => {
        dispatch(setUserToken(res.user.id));
        if (res.error) {
          Alert.alert(error.message);
          return;
        }
        dispatch(
          setSignUp({
            email,
            firstName,
            lastName,
            phone,
            dob: dob.toString(),
          })
        );
        setLoading(false);
      });
    //  await supabase
    //    .from("Users")
    //    .insert([
    //      {
    //        email: email,
    //        firstName: firstName,
    //        lastName: lastName,
    //        dob: dob,
    //        phone: phone,
    //      },
    //    ])
    //    .then((res) => {
    //      if (res.error) {
    //        Alert.alert(res.error.message);
    //        setLoading(false);
    //        return;
    //      }
    //    })
    //    .catch((err) => {
    //      Alert.alert(err.message);
    //      setLoading(false);
    //    });
    //  if (errorWithTable) Alert.alert(errorWithTable.message);
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={tw`text-10 p-4 pb-8`}>Sign Up</Text>
        {/* <Input
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
        /> */}
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholder="email@address.com"
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>
      <Input
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
      />
      {/* <Input
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
      /> */}

      <View style={tw`p-3`}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </SafeAreaView>
  );
}
