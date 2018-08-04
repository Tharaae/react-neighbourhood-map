import React, { Component } from 'react';
import MapComponent from './MapComponent';
import PlacesList from './PlacesList';
import './App.css';

class App extends Component {
  state = {
    defaultCenter: { lat: -33.71697, lng: 150.9171843 },
    defaultZoom: 12,
    places: []
  }

  constructor() {
      super();
      this.googleMapsAPIsURL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA83ru5Va-VflHbHHAxRcz1TV9QMspFJa0';
      this.map = {};
      this.setMap = this.setMap.bind(this);
      this.setInitialPlacesList = this.setInitialPlacesList.bind(this);
  }

  setInitialPlacesList() {
    if(this.state.places.length === 0) {
      const {defaultCenter} = this.state;

      const google = window.google;
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch(
        {
          location: new google.maps.LatLng(defaultCenter.lat,defaultCenter.lng),
          radius: 2000,
          type: ['park']
        },
        (places, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if(places.length !== 0) {
              this.setState({places});
              console.log('App constructor places state set', this.state.places);
            } else {
              alert('No places retrieved!');
            }
          } else {
            alert(`Error ${status} occured.`);
          }
        }
      );
    }
  }

  setMap(map) {
    this.map = map;
    if(map) {console.log('App from set map',this.map.getBounds())};
  }

  render() {
    console.log('App render');
    const {defaultCenter, defaultZoom, places} = this.state;
    return (
      <div id="app" className="app">
        <div id="list-panel" className="list-panel">
          <PlacesList
            places={places}
          />
        </div>

        <div className="main">
          <header className="app-header">
            <h1>Neighbourhood Parks</h1>
          </header>

          <MapComponent
            isMarkerShown
            googleMapURL={this.googleMapsAPIsURL}
            loadingElement={<div />}
            containerElement={<div className="map-container" />}
            mapElement={<div className="map" />}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            setMap={this.setMap}
            onMapLoaded={this.setInitialPlacesList}
            places={places}
          />
        </div>
      </div>
    );
  }
}

export default App;
