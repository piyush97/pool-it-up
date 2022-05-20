import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import tw from "twrnc";
import { supabase } from "../lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let session;

  console.log(session);

  const handleSignIn = async () => {
    await supabase.auth
      .signIn({
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
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
      <Button
        title="check"
        onPress={async () =>
          console.log(
            await supabase.from("Users").insert([
              {
                // email,
                // firstName,
                // lastName,
                // dob: dob.toString(),
                // phone,
                email: "me@piyushmehta.com", // TODO: remove this
                first_name: "Piyush", // TODO: remove this
                last_Name: "Mehta", // TODO: remove this
                dob: "2020-05-05T00:00:00.000Z", // TODO: remove this
                phone: "1234567890", // TODO: remove this
              },
            ])
          )
        }
      />
      <Button title="Sign In" style={tw`p-2`} onPress={() => handleSignIn()} />
    </SafeAreaView>
  );
};

export default SignInScreen;
