import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@rneui/themed';
import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import RideOptionsCard from '../components/RideOptionsCard';

/**
 * Map Screen Component - Map
 *
 *
 * @return {React.ReactElement} - The Map Screen Component
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const MapScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '50%', '85%'], []);

  const { theme } = useTheme();
  return (
    <View style={{ height: '100%', backgroundColor: theme.colors.background }}>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        handleStyle={{ backgroundColor: theme.colors.grey2 }}
        index={1}
        handleIndicatorStyle={{ backgroundColor: theme.colors.black }}
        detached={true}
        snapPoints={snapPoints}
      >
        <RideOptionsCard />
      </BottomSheet>
    </View>
  );
};

export default MapScreen;
