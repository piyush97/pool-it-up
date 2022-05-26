import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import RideOptionsCard from '../components/RideOptionsCard';
type RootStackParamList = {
  RideOptionsCard: {
    options: {
      headerShown: boolean;
    };
  };
};
function MapScreen() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <View style={{ height: '100%' }}>
      <View style={tw`h-1/3`}>
        <Map />
      </View>
      <View style={tw`h-full`}>
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
