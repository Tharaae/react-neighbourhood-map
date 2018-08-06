import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

/*
 * MapComponent stateless functional component is created using
 * react-google-maps wrapper components based on Google Maps APIs
 * to handle map, markers and info-widows display
 */
const MapComponent = withScriptjs(withGoogleMap((props) => {
  
  const {defaultCenter, defaultZoom, onMapLoaded, places, selectedPlaceId} = props;

  // GoogleMap component uses the passed array of places prop from parent App components
  // to display markers for according to current search results.
  // Marker is visible if place is set as visible according to search results.
  // Marker animates (bounces) if the corresponding place is currently selected.
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onTilesLoaded={onMapLoaded}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.geometry.location}
          visible={place.visible}
          clickable={true}
          animation={place.id === selectedPlaceId ? window.google.maps.Animation.BOUNCE : null}
        />
      ))}
    </GoogleMap>
  );
}));

export default MapComponent;
