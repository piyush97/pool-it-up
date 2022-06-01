import { SafeAreaView, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import React, { useEffect } from 'react';
import { Avatar, Card, Button, useTheme, Image, Text } from '@rneui/themed';
import { definitions } from '../types/supabase';
import tw from 'twrnc';
import dbService from '../service/DbService';
import getGravatar from '../utils/getGravatar';
import { rideImages } from '../constants/ride';
import { carImageProvider } from '../constants/fetchDetails';

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
  const [gravatar, setGravatar] = React.useState<string>();
  const { theme } = useTheme();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getRideData(id);
      const { host_email } = data;
      setGravatar(getGravatar(host_email));
      getUserData(host_email).then(({ data }) => {
        if (data) setData(data[0]);
        else setData(null);
      });
    };
    getData();
  }, [setData]);
  return (
    <TouchableOpacity>
      <Card containerStyle={{ backgroundColor: theme.colors.grey2, borderWidth: 0 }}>
        <Card.Title>
          <Image source={carImageProvider(car_type)} style={tw`w-12 h-10`} />
          <Text style={{ ...tw`text-xl font-light ` }}>
            {title} By {data?.first_name}
          </Text>
        </Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

export default MyRideCard;
