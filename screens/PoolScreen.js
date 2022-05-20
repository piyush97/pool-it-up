import { GOOGLE_MAPS_APIKEY } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { supabase } from "../lib/supabase";
import { selectUser } from "../slices/authSlice";

const PoolScreen = () => {
  const [carType, setCarType] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [carNumber, setCarNumber] = React.useState("");
  const [passengers, setPassengers] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState(new Date());
  const [endDateTime, setEndDateTime] = React.useState(new Date());
  const [costPerPassenger, setCostPerPassenger] = React.useState("");
  const [costPerBag, setCostPerBag] = React.useState("");
  const {
    user: { email, id },
  } = useSelector(selectUser);
  const navigation = useNavigation();

  const onHandleSubmit = async () => {
    await supabase
      .from("Rides")
      .insert([
        {
          car_type: carType,
          car_name: carName,
          car_number: carNumber,
          seats_available: passengers,
          from,
          to,
          host_id: id,
          host_email: email,
          datetime_start: startDateTime.toISOString(),
          todatetime_end: endDateTime.toISOString(),
          cost_passenger: costPerPassenger,
          cost_bag: costPerBag,
        },
      ])
      .then((res) => {
        Alert.alert("Done");
        console.log(res);
        navigation.navigate("HomeScreen");
        if (res.error) {
          console.log(res);
          Alert.alert(res.error.message);
          return;
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView>
      <Text style={tw`text-8 p-2`}>Add Details</Text>
      <Input
        placeholder="Car Type"
        value={carType}
        onChangeText={(text) => setCarType(text)}
        style={tw`p-2 mt-2 `}
      />
      <Input
        placeholder="Car Number"
        value={carNumber}
        onChangeText={(text) => setCarNumber(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Car Name"
        value={carName}
        onChangeText={(text) => setCarName(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Passengers required"
        value={passengers}
        onChangeText={(text) => setPassengers(text)}
        style={tw`p-2`}
        keyboardType="number-pad"
      />

      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        onFail={(err) => console.log(err)}
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          setFrom({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        styles={{
          container: {
            flex: 0,
            paddingHorizontal: 10,
          },

          textInput: {
            fontSize: 20,
            fontWeight: "400",
            color: "#000",
            backgroundColor: "transparent",
            height: 40,
            borderBottomWidth: 0.45,
            borderBottomColor: "#222",
            flex: 1,
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        placeholder="Where from?"
      />
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        onFail={(err) => console.log(err)}
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        currentLocationLabel="Current Location"
        keyboardShouldPersistTaps="handled"
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          setTo({
            location: details.geometry.location,
            description: data.description,
          });
        }}
        styles={{
          container: {
            flex: 0,
            paddingHorizontal: 10,
            paddingVertical: 20,
          },

          textInput: {
            fontSize: 20,
            fontWeight: "semi-bold",
            color: "#000",
            backgroundColor: "transparent",
            height: 40,
            borderBottomWidth: 0.45,
            borderBottomColor: "#222",
            flex: 1,
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        placeholder="Where to?"
      />
      <Text style={{ height: 18, marginLeft: 12, padding: 1 }}>
        Date and Time of the Journey Starts:{" "}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={startDateTime}
        mode="datetime"
        is24Hour={false}
        display="default"
        style={tw`p-2 mr-4`}
        onChange={(e) => {
          setStartDateTime(new Date(e.nativeEvent.timestamp));
        }}
      />
      <Text style={{ height: 18, marginLeft: 12, padding: 1 }}>
        Date and Time of the Journey Ends:{" "}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={endDateTime}
        mode="datetime"
        is24Hour={false}
        display="default"
        style={tw`p-2 mr-4`}
        onChange={(e) => {
          setEndDateTime(new Date(e.nativeEvent.timestamp));
        }}
      />
      <Input
        placeholder="Cost per Passenger in CAD$"
        keyboardType="decimal-pad"
        value={costPerPassenger}
        onChangeText={(text) => setCostPerPassenger(text)}
        style={tw`p-2`}
      />
      <Input
        placeholder="Cost per checkin bag in CAD$"
        keyboardType="number-pad"
        value={costPerBag}
        onChangeText={(text) => setCostPerBag(text)}
        style={tw`p-2`}
      />
      <Button
        title="Submit"
        style={tw`px-3`}
        onPress={() => onHandleSubmit()}
      ></Button>
    </SafeAreaView>
  );
};

export default PoolScreen;
