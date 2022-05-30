import { FlatList, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme, Text } from '@rneui/themed';
import dbService from '../service/DbService';
import { useAuth } from '../context/AuthContext';

const MyRidesScreen = () => {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const { id = null } = authData;

  const [RideData, setRideData] = React.useState<any>();
  useEffect(() => {
    const dataRideFetch = async () => {
      dbService.getUserRides(id).then(({ data }) => {
        setRideData(data);
      });
    };
    dataRideFetch();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text>MyRidesScreen</Text>
      <FlatList
        data={RideData}
        renderItem={({ item }) => <Text>{JSON.stringify(item, null, 4)}</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default MyRidesScreen;
