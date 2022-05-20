import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PoolScreen from "../screens/PoolScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { selectIsLoggedIn } from "../slices/authSlice";

const Router = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  let isSignout = false;

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GetARide"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PoolMyRide"
            component={PoolScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
              title: "Sign in",
              animationTypeForReplace: isSignout ? "pop" : "push",
            }}
          />

          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: false,
            }}
            component={SignUpScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
