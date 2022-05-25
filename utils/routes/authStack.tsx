import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FORGOT_PASSWORD, ONBOARDING, SIGN_IN, SIGN_UP } from '../../constants/routesConstants';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import OnboardingScreen from '../../screens/OnboardingScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';

/**
 * @description - Auth Routes for the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @returns {StackNavigator} - Auth Routes for the application
 */
function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
