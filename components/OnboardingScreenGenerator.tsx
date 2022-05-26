/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, SocialIcon, Text, useTheme, useThemeMode } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import fetchDetails from '../constants/fetchDetails';
import { FORGOT_PASSWORD } from '../constants/routesConstants';
import socialLoginOptions from '../constants/socialLoginOptions';
import { useAuth } from '../context/AuthContext';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

/**
 * @description - Onboarding Screen for the application to onboard the user to the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {number} flowType - Type of flow to be shown on the screen
 * @return {React.ReactElement} - Onboarding Screen for the application to onboard the user to the application
 */
function OnboardingScreenGenerator({ flowType }: { flowType: number }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(new Date());

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
      await signUp(email, password, firstName, lastName, dob.toLocaleDateString(), phone);
    }
  };

  return (
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
          <Text style={tw`text-right pr-3 pb-2`}>Date of Birth</Text>
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
            onChange={(e) => {
              setDob(new Date(e.nativeEvent.timestamp));
            }}
          />
        </>
      )}

      {flowType === 0 && (
        <TouchableOpacity style={{ flex: 0 }} onPress={() => navigation.navigate(FORGOT_PASSWORD)}>
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
  );
}

export default OnboardingScreenGenerator;
