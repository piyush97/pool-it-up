import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Card, Text, useTheme } from '@rneui/themed';
import { definitions } from '../types/supabase';
import tw from 'twrnc';
import dbService from '../service/DbService';

const MyRideCard = ({
  created_at,
  id,
  car_type,
  car_name,
  from,
  to,
  datetime_start,
  todatetime_end,
  cost_bag,
  cost_passenger,
  title,
}: definitions['Rides']) => {
  const { getUserData, getRideData } = dbService;
  const [data, setData] = React.useState<any>();
  const { theme } = useTheme();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getRideData(id);
      const { host_email } = data;
      getUserData(host_email).then(({ data }) => {
        if (data) setData(data[0]);
        else setData(null);
      });
    };
    getData();
  }, [setData]);
  return (
    <SafeAreaView>
      <Card containerStyle={{ backgroundColor: theme.colors.grey2 }}>
        <Text> {JSON.stringify(new Date(created_at).toLocaleDateString(), null, 4)}</Text>
        <Card.Title>
          {title} By {data?.first_name}
        </Card.Title>
        <>
          <View style={tw`flex-row`}>
            <View style={tw`flex-1`}>
              <Text>Date: {new Date(datetime_start).toLocaleDateString()}</Text>
              <Text>Time: {new Date(todatetime_end).toLocaleTimeString()}</Text>
            </View>
            <Text>{from}</Text>
            <Text>{to}</Text>
          </View>

          <View style={tw`flex-row`}>
            <View style={tw`flex-1`}>
              <Text>{car_type}</Text>
              <Text>{car_name}</Text>
            </View>
            <View style={tw`flex-1`}>
              <View style={tw`flex-1`}>
                <Text>{cost_bag}</Text>
                <Text>{cost_passenger}</Text>
              </View>
            </View>
          </View>
        </>
        <>
          <TouchableOpacity>
            <Text>View</Text>
          </TouchableOpacity>
        </>
      </Card>
    </SafeAreaView>
  );
};

export default MyRideCard;
