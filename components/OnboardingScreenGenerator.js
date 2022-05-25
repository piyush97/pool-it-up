/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, SocialIcon, Text, useTheme, useThemeMode } from '@rneui/themed';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import fetchDetails from '../constants/fetchDetails';
import { FORGOT_PASSWORD } from '../constants/routesConstants';
import socialLoginOptions from '../constants/socialLoginOptions';
import { useAuth } from '../context/AuthContext';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

function OnboardingScreenGenerator({ flowType }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {
    title,
    bottomNavigationLink,
    bottomNavigationText,
    buttonText,
    onButtonPress,
    nextScreen,
  } = fetchDetails({
    flowType,
    email,
    password,
  });

  const { setMode } = useThemeMode();
  useEffect(() => {
    setMode('dark');
  }, [setMode]);
  const [loading, isLoading] = useState(false);

  const auth = useAuth();
  const onBoardingFlow = async () => {
    isLoading(true);
    await auth.signIn();
  };
  // const { error = null, user } = await onButtonPress();
  // if (error) {
  //   Alert.alert(error?.message);
  // } else if (user) {
  //   dispatch(setUser(user));

  //   if (flowType === 0) {
  //     await AsyncStorage.setItem('@isLoggedIn', 'true');
  //     dispatch(setIsLoggedIn(true));
  //   }
  //   dispatch(setSignUp({ email }));
  //   // navigation.navigate(nextScreen);
  // }
  // };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>{title}</Text>
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
      {/* <Button title={title} style={tw`p-2 pt-12 `} onPress={() => onBoardingFlow()} /> */}
      {loading ? (
        <ActivityIndicator color="#000" animating size="small" />
      ) : (
        <Button title="Sign In" onPress={onBoardingFlow} />
      )}
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
OnboardingScreenGenerator.propTypes = {
  flowType: PropTypes.number.isRequired,
};

export default OnboardingScreenGenerator;
