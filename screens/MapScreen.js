import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import RideOptionsCard from '../components/RideOptionsCard';

function MapScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <View style={tw`h-1/3`}>
        <Map />
      </View>
      <View style={tw`h-2/3`}>
        <Stack.Navigator>
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

export default MapScreen;
