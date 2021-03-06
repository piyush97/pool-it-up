/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Input, Text, useTheme, useThemeMode } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import fetchDetails from '../constants/fetchDetails';
import supabase from '../lib/supabase';
/**
 * Forgot Password Screen
 * @author Piyush Mehta <me@piyushmehta.com>
 *
 * @return {React.ReactElement} - Forgot Password Screen
 */
const ForgotPasswordScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const { bottomNavigationLink } = fetchDetails({ flowType: 1 });

  const { setMode } = useThemeMode();
  useEffect(() => {
    setMode('dark');
  }, [setMode]);

  const onBoardingFlow = async () => {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      Alert.alert(error?.message);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>Forgot Password</Text>
      <Input
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Button title="Submit" style={tw`p-2 pt-2 `} onPress={() => onBoardingFlow()} />
      <Text
        style={{
          fontWeight: '500',
          textAlign: 'center',
          color: theme.colors.grey1,
        }}
      >
        Don&apos;t have an account?
        <Text
          onPress={() => navigation.navigate(bottomNavigationLink)}
          style={{
            fontWeight: '700',
            textAlign: 'center',
            color: theme.colors.grey0,
          }}
        >
          {' '}
          Register{' '}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
