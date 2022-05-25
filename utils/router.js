/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import { StackUnProtectedRoutes, TabRoutes } from '../constants/routesConstants';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  console.log('AuthData', authData);
  return <NavigationContainer>{authData ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}

function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
    >
      {TabRoutes.map(({ id, component, name, options }) => (
        <Tab.Screen key={id} name={name} component={component} options={options} />
      ))}
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {StackUnProtectedRoutes.map(({ id, component, name }) => (
        <Stack.Screen name={name} component={component} key={id} />
      ))}
    </Stack.Navigator>
  );
}

export default Router;
