import { AirbnbRating, Button, Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { Alert, Modal, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { carImageProvider } from '../constants/fetchDetails';
import RideConfirmationView from './RideConfirmationView';

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
  const [modalVisible, setModalVisible] = React.useState(false); //TODO: false after testing
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setSelected(id);
        }}
        style={
          selected && selected?.id === id
            ? {
                backgroundColor: theme.colors.primary,
                ...tw`p-2 border-b border-black h-25`,
              }
            : { ...tw`p-2 border-b border-black h-25` }
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
          selectedColor={
            selected && selected?.id !== id ? theme.colors.primary : theme.colors.black
          }
        />
        <Image source={carImageProvider(carType)} style={tw`w-20 mt-3 h-18 `} />

        <Text
          style={{
            position: 'absolute',
            top: '1%',
            left: 'auto',
            right: 'auto',
            alignContent: 'center',
            ...tw`mt-1 ml-4 text-xl font-semibold text-left `,
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
              ...tw`text-sm font-semibold`,
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
            ...tw`text-base font-light text-left`,
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
              ...tw`text-sm font-semibold`,
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
                  ...tw`text-xl font-bold text-right`,
                }
              : {
                  position: 'absolute',
                  right: '5%',
                  top: '50%',
                  color: theme.colors.black,
                  ...tw`text-xl font-bold text-right`,
                }
          }
        >
          ${price}
        </Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          presentationStyle="formSheet"
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView>
            <RideConfirmationView selected={selected} />
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default RideCard;
