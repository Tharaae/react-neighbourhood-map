import React, { Component } from 'react';
import withScriptjs from 'react-google-maps';
import MapComponent from './MapComponent';

const MapWithGoogleAPIs = withScriptjs((props) => {
  const {
    defaultCenter,
    defaultZoom,
    places,
    selectedPlaceId,
    listOpen,
    infoOpen,
    handlePlaceSelection,
    closeInfo
  } = props;

  //const googleMapsAPIsURL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA83ru5Va-VflHbHHAxRcz1TV9QMspFJa0&force=pwa';

console.log('MapWithGoogleAPIs', window.google);

  return (
    <MapComponent
      loadingElement={<div />}
      containerElement={
        <section
          id="map-container"
          className="map-container"
          role="application"
          aria-label="map with parks markers"
          tabIndex="0"
        />
      }
      mapElement={<div className="map"/>}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      places={places}
      selectedPlaceId={selectedPlaceId}
      infoOpen={infoOpen}
      handlePlaceSelection={handlePlaceSelection}
      closeInfo={closeInfo}
    />
  );
});

export default MapWithGoogleAPIs;
