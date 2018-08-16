import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import PlaceInfoModal from './PlaceInfoModal';
import imgPlaceholder from './img/img-not-available200.jpg';
import './App.css';

/*
 * MapComponent stateless functional component is created using
 * react-google-maps wrapper components based on Google Maps APIs
 * to handle map, markers and info-widows display
 */
const MapComponent = withScriptjs(withGoogleMap((props) => {

  const {
    defaultCenter,
    defaultZoom,
    onMapLoaded,
    places,
    selectedPlaceId,
    infoOpen,
    handlePlaceSelection,
    closeInfo
  } = props;

  // gets photo url via getUrl function provided by Google Maps APIs
  // or from static data if getURL is not available.
  // Otherwise, image placeholder is displayed.
  const getPlacePhotoSrc = (place) => {
    if(place.photos && place.photos[0] && place.photos[0].getUrl && window.google) {
      return place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
    } else {
      return place.smallImageUrl? place.smallImageUrl : imgPlaceholder;
    }
  };

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
          {place.id === selectedPlaceId && infoOpen &&
            <InfoWindow tabIndex="0" onCloseClick={closeInfo}>
              <div className="place-info">
                <div className="place-info-title">{place.name}</div>
                <div className="place-info-address">{place.vicinity}</div>
                <img
                  className="place-info-img"
                  src={getPlacePhotoSrc(place)}
                  alt={place.name}
                  onError={(event) => {event.target.src=imgPlaceholder;}}
                />
                <PlaceInfoModal place={place} />
              </div>
            </InfoWindow>
          }
        </Marker>
      ))}
    </GoogleMap>
  );
}));

MapComponent.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number.isRequired,
  places: PropTypes.array.isRequired,
  selectedPlaceId: PropTypes.string,
  infoOpen: PropTypes.bool,
  onMapLoaded: PropTypes.func.isRequired,
  handlePlaceSelection: PropTypes.func.isRequired,
  closeInfo: PropTypes.func.isRequired
};

export default MapComponent;
