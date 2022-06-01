/* eslint-disable import/no-unresolved */
import { useTheme } from '@rneui/themed';
import React, { useEffect, useRef } from 'react';
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectDestination, selectOrigin } from '../slices/navSlice';

/**
 *@description Map component
 * @author Piyush Mehta <me@piyushmehta.com>
 * @return {React.ReactElement} Map component
 */
function Map() {
  const { theme } = useTheme();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const originDetails = {
    latitude: origin?.location.lat,
    longitude: origin?.location.lng,
  };
  const destinationDetails = {
    latitude: destination?.location.lat,
    longitude: destination?.location.lng,
  };
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
    });
  }, [origin, destination]); // whenever origin or destination changes, this function will run
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      initialRegion={
        origin
          ? {
              latitude: origin?.location?.lat,
              longitude: origin?.location?.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
          : {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
      }
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={originDetails}
          destination={destinationDetails}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor={theme.colors.primary}
        />
      )}
      {origin?.location && (
        <Marker
          title="Origin"
          identifier="origin"
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
        />
      )}
      {destination?.location && (
        <Marker
          title="Destination"
          identifier="destination"
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;
