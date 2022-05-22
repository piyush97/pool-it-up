import { useNavigation } from '@react-navigation/native';
import { Card, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { profileDetails } from '../constants/fetchDetails';
import { selectUser, setIsLoggedIn } from '../slices/authSlice';

function ProfileScreen() {
  const { id: user_id } = useSelector(selectUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`text-10 py-4 pl-8 pb-8 pt-50`}>Profile</Text>
      <Card
        containerStyle={{
          borderWidth: 0,
          backgroundColor: theme.colors.background,

          display: 'flex',
        }}
      >
        {profileDetails.map((item) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              onPress={async () => {
                item.function(user_id).then(() => {
                  if (item.id === 5) {
                    dispatch(setIsLoggedIn(false));
                    navigation.navigate('SignIn');
                  }
                });
              }}
              style={{ paddingVertical: 12 }}
            >
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 20,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10, backgroundColor: theme.colors.grey4, height: 1 }} />
          </React.Fragment>
        ))}
      </Card>
    </View>
  );
}

export default ProfileScreen;
