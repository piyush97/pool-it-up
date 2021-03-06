import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import AppWrapper from '../components/AppWrapper';
import PlaceInput from '../components/PlaceInput';
import alertsText from '../constants/alertsText';
import { POOL_MODE, RIDE_MODE } from '../constants/placeholderConstants';
import { GET_A_RIDE, POOL_MY_RIDE } from '../constants/routesConstants';
import {
  selectDestination,
  selectOrigin,
  setDate,
  setDestination,
  setOrigin,
} from '../slices/navSlice';

/**
 * @description - Home Screen for the application
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @return {React.ReactElement} - Home Screen for the application
 */
function HomeScreen() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);

  const onHandlePress = () => {
    if (checked && destination && origin) {
      navigation?.navigate(POOL_MY_RIDE);
    } else if (!checked && destination && origin) {
      navigation?.navigate(GET_A_RIDE);
    } else {
      Alert.alert(alertsText.alertOriginOrDestinationNotEntered);
    }
  };

  const buttonTextGenerator = () => {
    if (checked) {
      return POOL_MODE;
    }
    return RIDE_MODE;
  };

  return (
    <AppWrapper theme={theme} title={checked ? 'Pool my Ride' : 'Book a Ride'}>
      <PlaceInput
        placeholderText={origin?.description || 'Where From?'}
        dispatcherFunction={setOrigin}
        customInputComponent
      />
      <PlaceInput
        placeholderText={destination?.description || 'Where To?'}
        dispatcherFunction={setDestination}
        customInputComponent
      />
      <View style={tw`mb-5`}>
        <Text style={tw`text-left ml-3  mb-2`}>
          {checked ? 'When do you want to pool?' : 'When do you want to ride?'}
        </Text>
        <DateTimePicker
          value={startDateTime}
          minimumDate={new Date()}
          mode="date"
          themeVariant="dark"
          textColor={theme.colors.black}
          display="default"
          style={tw`p-2 mt-2 mr-4`}
          onChange={(e) => {
            dispatch(setDate(new Date(e.nativeEvent.timestamp)));
          }}
        />
      </View>
      {/* Not Required currently */}
      {/* <SafeAreaView style={{ flex: 0, flexDirection: 'row' }}>
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
      </SafeAreaView> */}

      <Button
        style={tw`p-2 pt-4`}
        onPress={() => onHandlePress()}
        disabledStyle={{ backgroundColor: theme.colors.grey5, opacity: 0.5 }}
      >
        <Text style={{ color: theme.colors.black }}>{buttonTextGenerator()}</Text>
      </Button>
    </AppWrapper>
  );
}

export default HomeScreen;
