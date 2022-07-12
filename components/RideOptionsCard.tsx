// eslint-disable-next-line import/no-unresolved
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import SEDAN from '../assets/SEDAN.webp';
import SUV from '../assets/SUV.webp';
import { POOL_MY_RIDE } from '../constants/routesConstants';
import { useAuth } from '../context/AuthContext';
import { getRidesFromTo } from '../service/DbService';
import {
  selectDate,
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from '../slices/navSlice';
import { definitions } from '../types/supabase';
import Greeter from '../utils/greeting';
import PlaceInput from './PlaceInput';
import RideCard from './RideCard';
/**
 * @description - Ride options card Shows list of rides available
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @return {React.ReactElement} - Ride options card
 */
function RideOptionsCard() {
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const date = useSelector(selectDate);
  const { theme } = useTheme();
  const [selected, setSelected] = React.useState<any>(null);
  const { authData, userData } = useAuth();

  const [rides, setRides] = React.useState<definitions['Rides'][] | null>();
  const { email = null } = authData;
  const [dataOfUser, setDataOfUser] = React.useState<definitions['Users']>();

  useEffect(() => {
    const getUserData = async () => {
      const data = await userData(email);
      setDataOfUser(data && data);
    };
    const fetchRides = async () => {
      const { data: Rides, error } = await getRidesFromTo(origin, destination, date);
      if (error) {
        console.error(error);
      }
      setRides(Rides);
    };
    fetchRides();
    getUserData();
  }, [origin, destination, date]);

  const style = {
    fontSize: 18,
    color: theme.colors.black,
    flex: 1,
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: theme.colors.grey2,
    marginHorizontal: 20,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`py-2 text-xl text-center`}>
        {Greeter()}
        {dataOfUser && `, ${dataOfUser?.first_name} ${dataOfUser?.last_name}`}
      </Text>
      <PlaceInput
        placeholderText={origin?.description || 'Where From?'}
        ShowIcon={false}
        dispatcherFunction={setOrigin}
        style={style}
      />

      <TouchableOpacity
        style={{
          right: 'auto',
          top: 0,
          marginRight: 'auto',
          left: 50,
        }}
      >
        <Icon
          style={{ top: 2, right: 2 }}
          type="font-awesome"
          name="arrow-up"
          size={12}
          color={theme.colors.primary}
        />
        <Icon
          style={{ bottom: 2, left: 2 }}
          type="font-awesome"
          name="arrow-down"
          size={12}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
      <PlaceInput
        placeholderText={destination?.description || 'Where To?'}
        ShowIcon={false}
        dispatcherFunction={setDestination}
        style={style}
      />

      {/* TODO: Write logic for Db */}
      {/* <NavFavourites /> */}
      {rides?.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onEndReachedThreshold={0.5}
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={({
            item: {
              id,
              car_type: carType,
              cost_passenger: price,
              seats_available: availableSeats,
              cost_bag: costPerBag,
              car_number: carNumber,
              car_name: carModel,
              bags_available: bagsAvailable,
            },
            item,
          }) => (
            <RideCard
              setSelected={setSelected}
              carType={carType}
              price={price}
              selected={selected}
              costPerBag={costPerBag}
              carNumber={carNumber}
              availableSeats={availableSeats}
              item={item}
              SEDAN={SEDAN}
              SUV={SUV}
              carModel={carModel}
              id={id}
              theme={theme}
              bags_available={bagsAvailable}
            />
          )}
        />
      ) : (
        <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate(POOL_MY_RIDE)}>
            <Text>
              No Ride Available for this Route
              <Text style={{ color: theme.colors.primary }}> Wanna Pool your ride?</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default RideOptionsCard;
