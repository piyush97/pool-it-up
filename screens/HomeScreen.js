/* eslint-disable react/no-unstable-nested-components */
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, Switch, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { GET_A_RIDE, POOL_MY_RIDE } from '../constants/routesConstants';
import useSwapper from '../hooks/useSwapper';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';

function HomeScreen() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const { data: swapData, from, to } = useSwapper();

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

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     dispatch(
  //       setOrigin({
  //         location: location.coords,
  //       })
  //     );
  //   })();
  // }, []);
  return (
    <View style={{ height: '100%', backgroundColor: theme.colors.background }}>
      <Text style={tw`text-10 py-4 pl-2 pb-8 pt-50`}>
        {checked ? 'Pool my Ride' : 'Book a Ride'}
      </Text>
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
              location: details.geometry.location,
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
              location: details.geometry.location,
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
    </View>
  );
}

export default HomeScreen;
