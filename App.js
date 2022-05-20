import { NavigationContainer } from '@react-navigation/native';
import { createTheme, lightColors, ThemeProvider } from '@rneui/themed';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import store from './store';
import Router from './utils/router';

export default function App() {
  const theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
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
