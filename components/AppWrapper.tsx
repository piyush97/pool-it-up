import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { HeaderComponentProps } from '../types/env';
/**
 * App Wrapper Component - Header
 *
 * @param {HeaderComponentProps} { title, theme, children }
 * @return {React.ReactElement} - The App Wrapper Component
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const AppWrapper = ({ title, theme, children }: HeaderComponentProps) => {
  return (
    <View style={{ height: '100%', backgroundColor: theme?.colors.background }}>
      <Text style={tw`py-4 pb-8 pl-2 text-10 pt-50`}>{title}</Text>
      {children}
    </View>
  );
};

export default AppWrapper;
