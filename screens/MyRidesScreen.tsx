import { FlatList, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme, Text } from '@rneui/themed';
import dbService from '../service/DbService';
import { useAuth } from '../context/AuthContext';
import MyRideCard from '../components/MyRideCard';
import { definitions } from '../types/supabase';
import tw from 'twrnc';

const MyRidesScreen = () => {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const { id = null } = authData;

  const [RideData, setRideData] = React.useState<any>();
  useEffect(() => {
    const dataRideFetch = async () => {
      await dbService.getUserRides(id).then(({ data }) => setRideData(data));
    };
    dataRideFetch();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>My Rides</Text>
      <FlatList
        data={RideData}
        renderItem={({ item }) => (
          <MyRideCard
            created_at={item.created_at}
            id={item.id}
            car_type={item.car_type}
            car_name={item.car_name}
            from={item.from?.description}
            to={item.to?.description}
            datetime_start={item.datetime_start}
            todatetime_end={item.todatetime_end}
            cost_passenger={item.cost_passenger}
            cost_bag={item.cost_bag}
            title={item.title}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default MyRidesScreen;
