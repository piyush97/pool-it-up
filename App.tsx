import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import registerNNPushToken from 'native-notify';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NOTIF_APP_ID, NOTIF_APP_TOKEN } from 'react-native-dotenv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import theme from './constants/themeDetails';
import { AuthProvider } from './context/AuthContext';
import store from './store';
import Router from './utils/routes/router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
/**
 * @description - Root component of the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @export - Root component of the application
 * @return {React.ReactElement} - Root component of the application
 */
export default function App(): React.ReactElement {
  registerNNPushToken(NOTIF_APP_ID, NOTIF_APP_TOKEN);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
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
      </NavigationContainer>
    </ThemeProvider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token: SetStateAction<string>;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
