import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { HeaderComponentProps } from '../types/env';

const AppWrapper = ({ title, theme, children }: HeaderComponentProps) => {
  return (
    <View style={{ height: '100%', backgroundColor: theme?.colors.background }}>
      <Text style={tw`py-4 pb-8 pl-2 text-10 pt-50`}>{title}</Text>
      {children}
    </View>
  );
};

export default AppWrapper;
