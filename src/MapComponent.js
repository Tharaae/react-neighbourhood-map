import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) => {
  console.log('MapComponent render');
  const {defaultCenter, defaultZoom, setMap, onMapLoaded, places} = props;

  return (
    <GoogleMap
      ref={map => setMap(map)}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onTilesLoaded={onMapLoaded}
    />
  );
}));

export default MapComponent;
