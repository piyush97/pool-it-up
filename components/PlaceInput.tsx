import { Icon, Input } from '@rneui/themed';
import React from 'react';
import { Alert, Pressable } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { PlaceInputProps } from '../types/env';
/**
 * Place Input Component - Google Places Autocomplete
 * @param {PlaceInputProps} props - PlaceInputProps
 * @return {React.ReactElement} - The Place Input Component
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const PlaceInput = ({
  placeholderText,
  ShowIcon,
  dispatcherFunction,
  style,
  customInputComponent = false,
}: PlaceInputProps) => {
  const dispatch = useDispatch();
  return (
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
        InputComp: customInputComponent && Input,
        rightIcon: ShowIcon && (
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
        style,
        errorStyle: { color: 'red' },
      }}
      onPress={(data, details = null) => {
        dispatch(
          dispatcherFunction({
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
      placeholder={placeholderText}
    />
  );
};

export default PlaceInput;
