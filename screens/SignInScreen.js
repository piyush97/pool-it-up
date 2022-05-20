/* eslint-disable no-console */
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import supabase from '../lib/supabase';
import { selectUser, setIsLoggedIn, setUser } from '../slices/authSlice';

function SignInScreen() {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log(`USER ${user}`);

  const handleSignIn = async () => {
    await supabase.auth
      .signIn({
        email,
        password,
      })
      .then((data) => {
        console.log('data', data);
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ background: theme.colors.primary }}>
      <Text style={tw`text-10 p-4 pb-8`}>Sign In</Text>
      <Input
        label="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="email@address.com"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Input
        label="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button title="Sign In" style={tw`p-2`} onPress={() => handleSignIn()} />
    </SafeAreaView>
  );
}

export default SignInScreen;
