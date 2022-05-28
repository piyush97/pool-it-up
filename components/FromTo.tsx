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
const FromTo = ({ from, to, startDateTime, endDateTime }: FromToProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={{ ...tw`pt-2 pl-3 text-xl`, top: '42%' }}>{from?.split(',')?.shift()}</Text>
      <Text style={{ ...tw`pt-2 pl-3 text-md`, top: '42%', color: theme.colors.grey1 }}>
        {new Date(startDateTime).toLocaleDateString()}
      </Text>
      <Text style={{ ...tw`pt-2 pl-3 text-md`, top: '42%', color: theme.colors.grey1 }}>
        {new Date(startDateTime).toLocaleTimeString()}
      </Text>
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
      <Text
        style={{
          ...tw`pt-2 pr-3 text-md`,
          position: 'absolute',
          right: '2%',
          top: '68%',
          color: theme.colors.grey1,
        }}
      >
        {new Date(endDateTime).toLocaleDateString()}
      </Text>
      <Text
        style={{
          ...tw`pt-2 pr-3 text-md`,
          position: 'absolute',
          right: '2%',
          top: '93%',
          color: theme.colors.grey1,
        }}
      >
        {new Date(endDateTime).toLocaleTimeString()}
      </Text>
    </View>
  );
};

export default FromTo;
