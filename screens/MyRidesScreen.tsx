import { Switch, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import MyRideCard from '../components/MyRideCard';
import { useAuth } from '../context/AuthContext';
import dbService from '../service/DbService';

const MyRidesScreen = () => {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const { id = null } = authData;
  const [rides, setRides] = useState<any>([]);
  const [bookingData, setBookingData] = React.useState<any>();
  useEffect(() => {
    const dataRideFetch = async () => {
      await dbService.getUserRides(id).then(({ data }) => setBookingData(data));
      await dbService.getUserPostedRides(id).then(({ data }) => setRides(data));
    };
    dataRideFetch();
  }, []);
  const [type, setType] = useState(false); // TODO: change to 'rides'
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>
        {!type ? 'Rides booked by you' : 'Ride created by you'}
      </Text>
      <View>
        <Switch
          // float it on right side of the screen below the above element
          style={tw` ml-auto mr-10`}
          value={type}
          onValueChange={(value) => setType(value)}
        />
      </View>
      {!type ? (
        <FlatList
          data={bookingData}
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
      ) : (
        <FlatList
          data={rides}
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
      )}
    </SafeAreaView>
  );
};

export default MyRidesScreen;
