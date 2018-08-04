import React from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";

const MapComponent = withGoogleMap((props) => {
  console.log('MapComponent render');
  const {defaultCenter, defaultZoom, setMap} = props;

  return (
    <GoogleMap
      ref={map => setMap(map)}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
    />
  );
});

export default MapComponent;
