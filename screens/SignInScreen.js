/* eslint-disable no-console */
import { useNavigation } from '@react-navigation/native';
import { Button, Input, SocialIcon, Text, useTheme, useThemeMode } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import supabase from '../lib/supabase';
import { selectUser, setIsLoggedIn, setUser } from '../slices/authSlice';

function SignInScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log(`USER ${user}`);
  const { setMode } = useThemeMode();
  useEffect(() => {
    setMode('dark');
  }, [setMode]);
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
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <TouchableOpacity style={{ flex: 0 }}>
        <Text style={{ color: theme.colors.grey1, flex: 0, textAlign: 'right', paddingRight: 20 }}>
          Skip
        </Text>
      </TouchableOpacity>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>Login</Text>
      <Input
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Input
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />
      <TouchableOpacity style={{ flex: 0 }}>
        <Text
          style={{
            fontWeight: '500',
            color: theme.colors.grey1,
            flex: 0,
            textAlign: 'right',

            paddingRight: 20,
          }}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button title="Login" style={tw`p-2 pt-12 `} onPress={() => handleSignIn()} />
      <Text
        style={{
          color: theme.colors.grey1,
          flex: 0,
          textAlign: 'center',
          paddingHorizontal: 80,
        }}
      >
        By clicking the Login button you agree{' '}
        <Text
          style={{
            fontWeight: '700',
            color: theme.colors.grey1,
            flex: 0,
            textAlign: 'center',
          }}
        >
          with the rules and Privacy Policy
        </Text>{' '}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}
      >
        <SocialIcon
          style={{ backgroundColor: theme.colors.grey2, marginHorizontal: 20 }}
          type="google"
          onPress={() => {}}
          iconType="font-awesome"
        />
        <SocialIcon
          style={{ backgroundColor: theme.colors.grey2, marginHorizontal: 20 }}
          type="facebook"
          onPress={() => {}}
          iconType="font-awesome"
        />
        <SocialIcon
          style={{ backgroundColor: theme.colors.grey2, marginHorizontal: 20 }}
          type="linkedin"
          onPress={() => {}}
          iconType="font-awesome"
        />
      </View>
      <Text
        style={{
          fontWeight: '700',
          top: 150,
          textAlign: 'center',
          color: theme.colors.grey1,
        }}
      >
        Don&apos;t have an account?{' '}
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={{
            fontWeight: '700',
            textAlign: 'center',
            color: theme.colors.grey1,
          }}
        >
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default SignInScreen;
