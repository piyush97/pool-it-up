import { Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import tw from 'twrnc';

function ProfileScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={tw`text-10 py-4 pl-2 pb-8 pt-50`}>Profile</Text>
    </SafeAreaView>
  );
}

export default ProfileScreen;
