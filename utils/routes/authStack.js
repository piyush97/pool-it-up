import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRoutes } from '../../constants/routesConstants';

function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {StackRoutes.map(({ id, component, name }) => (
        <Stack.Screen name={name} component={component} key={id} />
      ))}
    </Stack.Navigator>
  );
}
export default AuthStack;
