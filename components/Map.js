import { GOOGLE_MAPS_APIKEY } from "@env";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectDestination, selectOrigin } from "../slices/navSlice";

const Map = () => {
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const originDetails = {
    latitude: origin.location.latitude,
    longitude: origin.location.longitude,
  };
  const destinationDetails = {
    latitude: destination.location.lat,
    longitude: destination.location.lng,
  };
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
    });
  }, [origin, destination]); //whenever origin or destination changes, this function will run
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={originDetails}
          destination={destinationDetails}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          title="Origin"
          identifier="origin"
          coordinate={{
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
          }}
        />
      )}
      {destination?.location && (
        <Marker
          title="Destination"
          identifier="destination"
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
