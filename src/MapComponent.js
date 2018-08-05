import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) => {
  const {defaultCenter, defaultZoom, setMap, onMapLoaded, places, setMarker} = props;

  return (
    <GoogleMap
      ref={map => setMap(map)}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onTilesLoaded={onMapLoaded}
    >
      {places.map((place) => (
        <Marker
          ref={marker => setMarker(place, marker)}
          key={place.id}
          position={place.geometry.location}
          visible={!place.marker || place.visible}
          animation={place.selected? window.google.maps.Animation.BOUNCE : null}
        />
      ))}
    </GoogleMap>
  );
}));

export default MapComponent;
