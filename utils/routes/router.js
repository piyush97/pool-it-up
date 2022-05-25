/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AppStack from './appStack';
import AuthStack from './authStack';

/**
 * @description - This is the main navigation container for the app.
 * @param {object} props - The props passed to the component.
 * @return {React.ReactElement} - The routes  of the application.
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
function Router() {
  const { theme } = useTheme();
  const { authData, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          height: '100%',
        }}
      >
        <ActivityIndicator color={theme.colors.black} animating size="large" />
      </SafeAreaView>
    );
  }
  return <NavigationContainer>{authData ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}

export default Router;
