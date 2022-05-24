import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { TabRoutes } from '../constants/routesConstants';
import { selectIsLoggedIn } from '../slices/authSlice';
import HomeScreen from './HomeScreen';

function HomeScreens() {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: theme.colors.background,
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
    >
      {TabRoutes.map(({ id, name, component, options }) => (
        <Tab.Screen key={id} name={name} component={component} options={options} />
      ))}
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default HomeScreens;
