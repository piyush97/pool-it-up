import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectOrigin } from "../slices/navSlice";
const Map = () => {
  const origin = useSelector(selectOrigin);
  return (
    <MapView
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
