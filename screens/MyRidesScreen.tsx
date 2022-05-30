import { SafeAreaView } from 'react-native';
import React from 'react';
import { useTheme, Text } from '@rneui/themed';

const MyRidesScreen = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <Text>MyRidesScreen</Text>
    </SafeAreaView>
  );
};

export default MyRidesScreen;
