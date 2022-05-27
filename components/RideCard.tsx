import { AirbnbRating, Icon, Image, Text } from '@rneui/themed';
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
              ...tw`h-25  p-2 border-b border-black`,
            }
          : { ...tw`h-25  p-2 border-b border-black` }
      }
    >
      <AirbnbRating
        starContainerStyle={{
          position: 'absolute',
          top: '1%',
          right: '2%',
          bottom: 'auto',
        }}
        count={5}
        defaultRating={3}
        size={10}
        isDisabled={true}
        showRating={false}
        selectedColor={selected && selected?.id !== id ? theme.colors.primary : theme.colors.black}
      />
      <Image
        source={carType?.toLowerCase() === 'sedan' ? SEDAN : SUV}
        style={tw`w-20 h-18 mt-3 `}
      />
      <Text
        style={{
          position: 'absolute',
          top: '1%',
          left: 'auto',
          right: 'auto',
          alignContent: 'center',
          ...tw`text-xl font-semibold text-left ml-4 mt-1 `,
        }}
      >
        {carModel}
      </Text>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: '75%',
          left: 'auto',
          right: '45%',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: '20%',
            left: '130%',
            right: 'auto',
            alignContent: 'center',
            textAlign: 'center',
            ...tw`text-sm  font-semibold`,
          }}
        >
          {availableSeats}
        </Text>
        <Icon
          type="font-awesome"
          name="user"
          color={selected && selected?.id !== id ? theme.colors.grey3 : theme.colors.black}
        />
      </SafeAreaView>
      <Text
        style={{
          position: 'absolute',
          top: '10%',
          left: 'auto',
          right: '76%',
          color: theme.colors.grey1,
          ...tw`text-base text-left font-light`,
        }}
      >
        {carType}
      </Text>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: '75%',
          left: 'auto',
          right: '60%',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: '20%',
            left: '130%',
            right: 'auto',
            alignContent: 'center',
            textAlign: 'center',
            ...tw`text-sm  font-semibold`,
          }}
        >
          {bags_available}
        </Text>
        <Icon
          type="font-awesome"
          name="suitcase"
          color={selected && selected?.id !== id ? theme.colors.grey3 : theme.colors.black}
        />
      </SafeAreaView>
      <Text
        style={
          selected?.id !== id
            ? {
                position: 'absolute',
                right: '5%',
                top: '50%',
                color: theme.colors.primary,
                ...tw`text-xl text-right font-bold`,
              }
            : {
                position: 'absolute',
                right: '5%',
                top: '50%',
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
