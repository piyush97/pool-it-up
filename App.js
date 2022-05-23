import { NavigationContainer } from '@react-navigation/native';
import { Text, ThemeProvider } from '@rneui/themed';
import * as Linking from 'expo-linking';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import theme from './constants/themeDetails';
import store from './store';
import Router from './utils/router';

export default function App() {
  const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
      screens: {
        Register: 'SignIn',
        SignUp: 'Signup',
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
              <Router />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
