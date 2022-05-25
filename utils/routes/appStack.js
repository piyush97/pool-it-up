import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabRoutes } from '../../constants/routesConstants';
/**
 * @description - Unprotected Routes for the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @returns {StackNavigator} - Unprotected Routes for the application
 */
function AppStack() {
  const Tab = createBottomTabNavigator();
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
export default AppStack;