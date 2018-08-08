import React from 'react';
import PlaceInfoModal from './PlaceInfoModal';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import './App.css';

/*
 * MapComponent stateless functional component is created using
 * react-google-maps wrapper components based on Google Maps APIs
 * to handle map, markers and info-widows display
 */
const MapComponent = withScriptjs(withGoogleMap((props) => {

  const {defaultCenter, defaultZoom, onMapLoaded, places, selectedPlaceId, handlePlaceSelection} = props;

  // GoogleMap render uses the passed array of places prop from parent App components
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
            <InfoWindow>
              <div className="place-info">
                <div className="place-info-title">{place.name}</div>
                <div className="place-info-address">{place.vicinity}</div>
                {place.photos && place.photos[0] &&
                  <img className="place-info-img" src={place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})} alt={place.name}/>
                }
                <PlaceInfoModal place={place} />
              </div>
            </InfoWindow>
          }
        </Marker>
      ))}
    </GoogleMap>
  );
}));

export default MapComponent;
