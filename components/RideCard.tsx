import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const RideCard = ({
  carType,
  price,
  availableSeats,
  costPerBag,
  carNumber,
  carModel,
  setSelected,
  selected,
  item,
  SEDAN,
  SUV,
  id,
  theme,
  bags_available,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(item);
      }}
      style={
        selected && selected?.id === id
          ? {
              backgroundColor: theme.colors.primary,
              ...tw`h-22  p-2 border-b border-black`,
            }
          : { ...tw`h-22  p-2 border-b border-black` }
      }
    >
      <Image source={carType?.toLowerCase() === 'sedan' ? SEDAN : SUV} style={tw`w-20 h-12 `} />
      <Text style={tw`text-sm text-left ml-4 mt-1 `}>{carModel}</Text>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: '50%',
          left: 'auto',
          right: '50%',
          alignContent: 'center',
        }}
      >
        <Icon
          type="font-awesome"
          name="user"
          color={selected && selected?.id !== id ? theme.colors.grey3 : theme.colors.black}
        />
        <Text style={{ textAlign: 'center', ...tw`text-sm mt-1 font-semibold` }}>
          {availableSeats}
        </Text>
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: '50%',
          left: 'auto',
          right: '60%',
          alignContent: 'center',
        }}
      >
        <Icon
          type="font-awesome"
          name="suitcase"
          color={selected && selected?.id !== id ? theme.colors.grey3 : theme.colors.black}
        />
        <Text style={{ textAlign: 'center', ...tw`text-sm mt-1 font-semibold` }}>
          {bags_available}
        </Text>
      </SafeAreaView>
      {/* <Icon type="font-awesome" name="suitcase" style={{}} /> */}

      <Text
        style={
          selected?.id !== id
            ? {
                position: 'absolute',
                right: '5%',
                top: '40%',
                color: theme.colors.primary,
                ...tw`text-xl text-right font-bold`,
              }
            : {
                position: 'absolute',
                right: '5%',
                top: '40%',
                color: theme.colors.black,
                ...tw`text-xl text-right font-bold`,
              }
        }
      >
        ${price}
      </Text>
    </TouchableOpacity>
  );
};

export default RideCard;
