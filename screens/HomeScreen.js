// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_APIKEY } from '@env';
import { Input, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { setDestination, setOrigin } from '../slices/navSlice';

function HomeScreen() {
  const dispatch = useDispatch();
  const { theme } = useTheme();

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
    <SafeAreaView style={{ height: '100%', backgroundColor: theme.colors.background }}>
      <Text style={tw`text-10 p-4 pb-8 pt-50`}>User Details</Text>
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
      <NavOptions />
    </SafeAreaView>
  );
}

export default HomeScreen;
