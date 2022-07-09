/* eslint-disable react/no-unstable-nested-components */
// eslint-disable-next-line import/no-unresolved
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, Switch, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import AppWrapper from '../components/AppWrapper';
import { GET_A_RIDE, POOL_MY_RIDE } from '../constants/routesConstants';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
/**
 * @description - Home Screen for the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @return {React.ReactElement} - Home Screen for the application
 */
function HomeScreen() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  // const { data: swapData, from, to } = useSwapper();

  const onHandlePress = () => {
    if (checked && destination && origin) {
      navigation?.navigate(POOL_MY_RIDE);
    } else if (!checked && destination && origin) {
      navigation?.navigate(GET_A_RIDE);
    } else {
      Alert.alert('Please enter your destination and origin before proceeding');
    }
  };
  const buttonTextGenerator = () => {
    if (checked) {
      return 'Pool My Ride';
    }
    return 'Get A Ride';
  };

  return (
    <AppWrapper theme={theme} title={checked ? 'Pool my Ride' : 'Book a Ride'}>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        // eslint-disable-next-line no-console
        onFail={(err) => console.log(err)}
        fetchDetails
        enableHighAccuracyLocation
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: Input,
          errorStyle: { color: 'red' },
        }}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details?.geometry.location,
              description: data.description,
            })
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
            backgroundColor: 'transparent',
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: 'country:ca',
        }}
        placeholder="Where From?"
      />
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        // eslint-disable-next-line no-console
        onFail={(err) => console.log(err)}
        fetchDetails
        enableHighAccuracyLocation
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: Input,
          rightIcon: (
            <Pressable
              onPress={() => {
                Alert.alert('WIP');
              }}
              style={{ paddingRight: 10 }}
            >
              <Icon name="arrow-up" type="font-awesome" size={18} />
              <Icon name="arrow-down" type="font-awesome" size={18} />
            </Pressable>
          ),

          errorStyle: { color: 'red' },
        }}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details?.geometry.location,
              description: data.description,
            })
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: 'transparent',
            fontSize: 18,
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: 'country:ca',
        }}
        placeholder="Where to?"
      />
      <SafeAreaView style={{ flex: 0, flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, color: theme.colors.black, marginLeft: 20 }}>
          {!checked ? 'Pool my Ride' : 'Book a Ride'}
        </Text>
        <Switch
          style={{
            alignItems: 'flex-end',
            marginLeft: 'auto',
            marginRight: 10,
          }}
          value={checked}
          onValueChange={(value) => setChecked(value)}
        />
      </SafeAreaView>

      <Button
        style={tw`p-2 pt-12`}
        onPress={() => onHandlePress()}
        disabledStyle={{ backgroundColor: theme.colors.grey5, opacity: 0.5 }}
      >
        <Text style={{ color: theme.colors.black }}>{buttonTextGenerator()}</Text>
      </Button>
    </AppWrapper>
  );
}

export default HomeScreen;
