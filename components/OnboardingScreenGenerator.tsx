/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, SocialIcon, Text, useTheme, useThemeMode } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import fetchDetails from '../constants/fetchDetails';
import socialLoginOptions from '../constants/socialLoginOptions';
import { useAuth } from '../context/AuthContext';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
/**
 * @description - Onboarding Screen for the application to onboard the user to the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {number} flowType - Type of flow to be shown on the screen
 * @return {React.ReactElement} - Onboarding Screen for the application to onboard the user to the application
 */
function OnboardingScreenGenerator({ flowType }: { flowType: 1 | 0 }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<any>();

  const { title, bottomNavigationLink, bottomNavigationText, buttonText } = fetchDetails({
    flowType,
  });

  const { setMode } = useThemeMode();
  useEffect(() => {
    setMode('dark');
  }, [setMode]);

  const { signIn, signUp } = useAuth();
  const onBoardingFlow = async () => {
    if (flowType === 0) {
      await signIn(email, password);
    }
    if (flowType === 1) {
      await signUp(email, password, firstName, lastName, new Date(dob).toLocaleDateString(), phone);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
        <Text style={tw`text-10 p-4 pb-8 ${flowType === 1 ? 'pt-2' : 'pt-50'} `}>{title}</Text>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          enablesReturnKeyAutomatically
          autoCorrect={false}
          autoComplete="email"
        />
        <Input
          rightIcon={
            <Pressable onPress={handlePasswordVisibility}>
              <Icon type="font-awesome" name={rightIcon} size={22} />
            </Pressable>
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          placeholder="Password"
          autoCapitalize="none"
        />
        {flowType === 1 && (
          <>
            <Input
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              enablesReturnKeyAutomatically
              placeholder="Confirm Password"
              autoCapitalize="none"
            />
            <Input
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              placeholder="First Name"
              autoComplete="name"
              autoCapitalize="words"
            />
            <Input
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              autoComplete="name"
              autoCapitalize="words"
            />
            <Input
              onChangeText={(text) => setPhone(text)}
              value={phone}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              autoComplete="tel"
              autoCapitalize="none"
            />
            <Text style={tw`pb-2 pr-3 text-right`}>Date of Birth</Text>
            <DateTimePicker
              testID="dateOfBirth"
              accessibilityLabel="dateOfBirth"
              value={dob}
              mode="date"
              is24Hour={false}
              display="default"
              themeVariant="dark"
              style={{
                padding: 0,
                marginRight: 12,
                flex: 0,
              }}
              onChange={(event) => {
                if (event.type === 'set') {
                  setDob(event.nativeEvent.timestamp);
                }
              }}
            />
          </>
        )}

        {flowType === 0 && (
          <TouchableOpacity style={{ flex: 0 }} onPress={() => setShowForgotPasswordModal(true)}>
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
        )}
        <Button style={tw`p-2 pt-12 `} title={title} onPress={onBoardingFlow} />
        <Text
          style={{
            color: theme.colors.grey1,
            flex: 0,
            textAlign: 'center',
            paddingHorizontal: 80,
          }}
        >
          By clicking the {`${title}`} button you agree{' '}
          <Text
            style={{
              fontWeight: '700',
              color: theme.colors.grey0,
              flex: 0,
              textAlign: 'center',
            }}
          >
            with the rules and Privacy Policy
          </Text>{' '}
        </Text>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'flex',
            alignContent: 'center',
            paddingTop: 50,
          }}
          data={socialLoginOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: { type, login } }) => (
            <SocialIcon
              style={{ backgroundColor: theme.colors.grey2, marginHorizontal: 20 }}
              type={type}
              onPress={login}
              iconType="font-awesome"
            />
          )}
        />

        <Text
          style={{
            fontWeight: '500',

            textAlign: 'center',
            color: theme.colors.grey1,
          }}
        >
          {bottomNavigationText}
          <Text
            onPress={() => navigation.navigate(bottomNavigationLink)}
            style={{
              fontWeight: '700',
              textAlign: 'center',
              color: theme.colors.grey0,
            }}
          >
            {' '}
            {buttonText}
          </Text>
        </Text>
      </SafeAreaView>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={showForgotPasswordModal}
        style={{ flex: 0 }}
        onRequestClose={() => {
          setShowForgotPasswordModal(false);
        }}
        statusBarTranslucent={true}
      >
        <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
          <Icon
            type="font-awesome"
            name="minus"
            style={{
              color: theme.colors.primary,
              fontSize: 30,
            }}
            size={22}
            onPress={() => setShowForgotPasswordModal(false)}
          />
          <ForgotPasswordScreen />
        </SafeAreaView>
      </Modal>
    </>
  );
}

export default OnboardingScreenGenerator;
