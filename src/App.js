import React, { Component } from 'react';
import MapComponent from './MapComponent';
import SearchPlaces from './SearchPlaces';
import './App.css';

class App extends Component {
  state = {
    defaultCenter: { lat: -33.71697, lng: 150.9171843 },
    defaultZoom: 14,
    places: []
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
          place.selected = false;
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
      this.setState({places});
    }
  }

  handlePlaceSelection(place, prevSelectedId) {
    console.log('handlePlaceSelection', place, 'prev id', prevSelectedId);
     const {places} = this.state;
     let changed = false;

     if(prevSelectedId) {
       const prevSelectedPlace = places.filter((place) => place.id === prevSelectedId);
       console.log('prev place found', prevSelectedPlace);
       if(prevSelectedPlace.length > 0 && prevSelectedPlace[0].selected) {
         prevSelectedPlace[0].selected = false;
         changed = true;
         console.log('prev selected place set to', prevSelectedPlace[0].selected);
       }
     }

     if(place && !place.selected) {
       console.log('newly selected place found', place);
       place['selected'] = true;
       changed = true;
       console.log('newly selected place set to', place);
     }

    if(changed) {
      this.setState({places});
    }
  }

  render() {
    const {defaultCenter, defaultZoom, places} = this.state;
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
          />
        </div>
      </div>
    );
  }
}

export default App;
