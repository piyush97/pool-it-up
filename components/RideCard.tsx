import { Icon } from '@rneui/themed';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(item);
      }}
    >
      <View
        style={
          selected && selected?.id === id
            ? {
                backgroundColor: theme.colors.primary,
                ...tw`flex-row  p-2 border-b border-gray-200`,
              }
            : tw`flex-row  p-2 border-b border-black`
        }
      >
        <View style={tw`flex-1`}>
          <Image source={carType?.toLowerCase() === 'sedan' ? SEDAN : SUV} style={tw`w-20 h-15 `} />
          <Text style={tw`text-sm text-left m-2`}>{carModel}</Text>
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-xl text-right`}>${price}</Text>
          <Text style={tw`text-sm text-right`}>{carType}</Text>
          <Text style={tw`text-sm text-right`}>{costPerBag}</Text>
          <Text style={tw`text-sm text-right`}>{carNumber}</Text>
          <Text style={tw`text-sm font-semibold text-right`}>{availableSeats} seats</Text>
        </View>
        <Icon name="chevron-right" size={24} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default RideCard;
