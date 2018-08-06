import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

/*
 * MapComponent stateless functional component is created using
 * react-google-maps wrapper components based on Google Maps APIs
 * to handle map, markers and info-widows display
 */
const MapComponent = withScriptjs(withGoogleMap((props) => {

  const {defaultCenter, defaultZoom, onMapLoaded, places, selectedPlaceId, handlePlaceSelection} = props;

  // GoogleMap component uses the passed array of places prop from parent App components
  // to display markers for according to current search results.
  // Marker is visible if place is set as visible according to search results.
  // Marker animates (bounces) if the corresponding place is currently selected.

  // onClick mareker calls handlePlaceSelection function passed from
  // parent App component to set list selected accordingly to clicked marker.
  
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
          onClick={() => handlePlaceSelection(place.id)}
        >
          {place.id === selectedPlaceId &&
            <InfoWindow
              onCloseClick={(o) => console.log('info window close', place)}
            >
              <div>
                <p><strong>{place.name}</strong></p>
                <p>{place.vicinity}</p>
              </div>
            </InfoWindow>
          }
        </Marker>
      ))}
    </GoogleMap>
  );
}));

export default MapComponent;
