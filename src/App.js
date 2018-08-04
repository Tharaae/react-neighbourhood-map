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
      this.map = {};
      this.setMap = this.setMap.bind(this);

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
            this.setState({places});
            console.log('App constructor places state set', this.state.places);
          } else {
            alert(`Error ${status} occured.`);
          }
        }
      );
  }

  setMap(map) {
    this.map = map;
    console.log('App from set map',this.map);
  }

  componentDidMount() {

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
            containerElement={<div className="map-container" />}
            mapElement={<div className="map" />}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            setMap={this.setMap}
          />
        </div>
      </div>
    );
  }
}

export default App;
