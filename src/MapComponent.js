import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) => {
  console.log('MapComponent render');
  const {defaultCenter, defaultZoom, setMap, onMapLoaded, places, setMarker} = props;
  //const markersList = [];

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
          defaultAnimation={window.google.maps.Animation.DROP}
        />
      ))}
    </GoogleMap>
  );
}));

export default MapComponent;
