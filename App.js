import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import PoolScreen from "./screens/PoolScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { store } from "./store";

export default function App() {
  const Stack = createNativeStackNavigator();
  const isSignedIn = false; // TODO: get from redux
  let isSignout = false;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            {isSignedIn ? (
              <Stack.Navigator>
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
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name="SignIn"
                  component={SignUpScreen}
                  options={{
                    headerShown: false,
                    title: "Sign in",
                    animationTypeForReplace: isSignout ? "pop" : "push",
                  }}
                />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </Stack.Navigator>
            )}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
