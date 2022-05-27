import { Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { FromToProps } from '../types/env';

/**
 * From - TO Component
 * @param {FromToProps} props - FromToProps
 * @return {React.ReactElement} - The From - TO Component
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const FromTo = ({ from, to }: FromToProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={{ ...tw`pt-2 pl-3 text-lg`, top: '42%' }}>{from?.split(',')?.shift()}</Text>
      <Icon name="arrow-right" size={30} color={theme.colors.primary} type="font-awesome" />
      <Text
        style={{
          ...tw`pt-2 pr-3 text-lg`,
          position: 'absolute',
          right: '2%',
          top: '42%',
          backgroundColor: 'transparent',
        }}
      >
        {to?.split(',')?.shift()}
      </Text>
    </View>
  );
};

export default FromTo;
