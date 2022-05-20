import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
import { setUser } from "../slices/authSlice";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let session;

  console.log(session);

  const handleSignIn = async () => {
    await supabase.auth
      .signIn({
        email: email,
        password: password,
      })
      .then((data) => {
        console.log("data", data);
        dispatch(setLoggedIn(true));
        dispatch(setUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <Text style={tw`text-10 p-4 pb-8`}>Sign In</Text>

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
      <Input
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
      />

      <Button title="Sign In" style={tw`p-2`} onPress={() => handleSignIn()} />
    </SafeAreaView>
  );
};

export default SignInScreen;
