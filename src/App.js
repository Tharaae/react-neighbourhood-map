import React, { Component } from 'react';
import MapComponent from './MapComponent';
import SearchPlaces from './SearchPlaces';
import './App.css';

class App extends Component {
  state = {
    defaultCenter: { lat: -33.71697, lng: 150.9171843 },
    defaultZoom: 14,
    places: [],
    selectedPlaceId: ''
  }

  constructor() {
      super();
      this.googleMapsAPIsURL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA83ru5Va-VflHbHHAxRcz1TV9QMspFJa0';
      this.map = {};
      this.setMap = this.setMap.bind(this);
      this.setInitialPlacesList = this.setInitialPlacesList.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
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
  }

  setMarker(place, marker) {
    if (!place.marker) {
      place['marker'] = marker;
      place['visible'] = true;
    };
  }

  handleSearch(query) {
    const {places} = this.state;
    const results = places.filter((place) => place.name.toLowerCase().includes(query));
    let changed = false;

    if(places.length !== results.length) {
      places.forEach((place) => {
        if(place.marker && place.visible) {
          place.visible = false;
          changed = true;
        }
      });

      results.forEach((place) => {
        if (place.marker && !place.visible) {
          place.visible = true;
          changed = true;
        }
      });
    } else {
      places.forEach((place) => {
        if(place.marker && !place.visible) {
          place.visible = true;
          changed = true;
        }
      });
    }

    if(changed) {
      this.setState({places, selectedPlaceId: null});
    }
  }

   handlePlaceSelection(selectedPlaceId) {
     if(selectedPlaceId !== this.state.selectedPlaceId) {
       this.setState({selectedPlaceId});
     }
   }

  render() {
    const {defaultCenter, defaultZoom, places, selectedPlaceId} = this.state;
    return (
      <div id="app" className="app">
        <SearchPlaces
          places={places}
          handleSearch={this.handleSearch}
          handlePlaceSelection={this.handlePlaceSelection}
        />

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
            setMarker={this.setMarker}
            onMapLoaded={this.setInitialPlacesList}
            places={places}
            selectedPlaceId={selectedPlaceId}
          />
        </div>
      </div>
    );
  }
}

export default App;
