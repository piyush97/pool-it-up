import { Card, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { profileDetails } from '../constants/fetchDetails';
import { useAuth } from '../context/AuthContext';

function ProfileScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`py-4 pb-8 pl-8 text-10 pt-50`}>Profile</Text>
      <Card
        containerStyle={{
          borderWidth: 0,
          backgroundColor: theme.colors.background,
          display: 'flex',
        }}
      >
        {profileDetails.map((item) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity onPress={async () => signOut()} style={{ paddingVertical: 12 }}>
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
