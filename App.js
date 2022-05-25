import { ThemeProvider } from '@rneui/themed';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import theme from './constants/themeDetails';
import { AuthProvider } from './context/AuthContext';
import store from './store';
import Router from './utils/router';

/**
 * @description - Root component of the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 *
 * @export - Root component of the application
 * @return {React.ReactElement} - Root component of the application
 */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
              <Router />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
