import { Card, Image, Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { carImageProvider } from '../constants/fetchDetails';
import dbService from '../service/DbService';
import { definitions } from '../types/supabase';
import getGravatar from '../utils/getGravatar';
import RideConfirmationView from './RideConfirmationView';

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
  const [showModal, setShowModal] = React.useState(false);

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
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Card containerStyle={{ backgroundColor: theme.colors.grey2, borderWidth: 0 }}>
          <Card.Title>
            <Image source={carImageProvider(car_type)} style={tw`w-12 h-10`} />
            <Text style={{ ...tw`text-xl font-light ` }}>
              {title} By {data?.first_name}
            </Text>
          </Card.Title>
        </Card>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <RideConfirmationView selected={id} modalClose={setShowModal} modal={true} />
      </Modal>
    </>
  );
};

export default MyRideCard;
