import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Button, SafeAreaView, Text, TextInput } from "react-native";

const PoolScreen = () => {
  const [startDateTime, setStartDateTime] = React.useState(new Date());
  const [endDateTime, setEndDateTime] = React.useState(new Date());
  return (
    <SafeAreaView>
      <TextInput
        placeholder="Car Type"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <TextInput
        placeholder="Car Name"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <TextInput
        placeholder="Passengers required"
        keyboardType="number-pad"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <TextInput
        placeholder="From"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <TextInput
        placeholder="To"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <Text style={{ height: 18, marginLeft: 12, padding: 1 }}>
        Date and Time of the Journey Starts:{" "}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={new Date()}
        mode="datetime"
        is24Hour={false}
        display="default"
        style={{
          height: 29,
          padding: 20,
          marginRight: 12,
        }}
        onChange={(e) => {
          setStartDate(new Date(e.nativeEvent.timestamp));
        }}
      />
      <Text style={{ height: 18, marginLeft: 12, padding: 1 }}>
        Date and Time of the Journey Ends:{" "}
      </Text>
      <DateTimePicker
        testID="dateTime"
        value={new Date()}
        mode="datetime"
        is24Hour={false}
        display="default"
        style={{
          height: 29,
          padding: 20,
          marginRight: 12,
        }}
        onChange={(e) => {
          setEndDate(new Date(e.nativeEvent.timestamp));
        }}
      />

      <TextInput
        placeholder="Cost per Passenger in CAD$"
        keyboardType="decimal-pad"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <TextInput
        placeholder="Cost per checkin bag in CAD$"
        keyboardType="number-pad"
        style={{ height: 40, margin: 12, borderWidth: 0.2, padding: 10 }}
      />
      <Button title="Submit"></Button>
    </SafeAreaView>
  );
};

export default PoolScreen;
