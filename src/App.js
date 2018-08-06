import React, { Component } from 'react';
import MapComponent from './MapComponent';
import SearchPlaces from './SearchPlaces';
import './App.css';

class App extends Component {
  state = {
    // initial center
    defaultCenter: { lat: -33.71697, lng: 150.9171843 },
    // initial zoom
    defaultZoom: 14,
    // places list (to be fetched by setInitialPlacesList)
    places: [],
    // currently selected place id (initiall set to empty string)
    selectedPlaceId: ''
  }

  constructor() {
    super();
    this.googleMapsAPIsURL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA83ru5Va-VflHbHHAxRcz1TV9QMspFJa0';
    this.setInitialPlacesList = this.setInitialPlacesList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
  }

  /*
   * Fetches initial places array.
   * It gets the nearby parks to the center location using Google Maps APIs
   */
  setInitialPlacesList() {
    // if places array not fetched yet
    if(this.state.places.length === 0) {
      const {defaultCenter} = this.state;
      const google = window.google;

      const service = new google.maps.places.PlacesService(document.createElement('div'));

      // get nearby places with place type 'park' within 2km of center
      service.nearbySearch(
        {
          location: new google.maps.LatLng(defaultCenter.lat,defaultCenter.lng),
          radius: 2000,
          type: ['park']
        },
        (places, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // if parke array successfully fetched, set places state accordingly
            if(places.length !== 0) {
              places.forEach((place) => {
                // initially set all places as visible (for markers display)
                place['visible'] = true;
              });
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

  /*
   * Does actions required when a new search takes place.
   * Takes newly entered serch term/query as argument.
   * Thsi function is pased to SearchPlaces component to run onChange
   */
  handleSearch(query) {
    const {places} = this.state;
    // get new search results
    const results = places.filter((place) => place.name.toLowerCase().includes(query));
    // flag to indicate if the places list actually changes by the new search
    let changed = false;

    // if places list is actually filtered
    if(places.length !== results.length) {
      // set all places list as invisible and flag change
      places.forEach((place) => {
        if(place.visible) {
          place.visible = false;
          changed = true;
        }
      });

      // set places in search results only as visible and flag change
      results.forEach((place) => {
        if (!place.visible) {
          place.visible = true;
          changed = true;
        }
      });
    } else { // if no filtering is required
      // set all list places as visible and flag change
      places.forEach((place) => {
        if(!place.visible) {
          place.visible = true;
          changed = true;
        }
      });
    }

    // if any change in places list took place,
    // set places state to changed list to invoke re-render
    // and clear any current place selection
    if(changed) {
      this.setState({places, selectedPlaceId: null});
    }
  }

  /*
   * Does actions required when new place clicke/selected by user.
   * This function is passed to PlacesList component to run onClick.
   */
  handlePlaceSelection(selectedPlaceId) {
    // if newly selected place is different than that already sekected,
    // set selectedPlaceId to the newly select place to re-render accordingly
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
          selectedPlaceId={selectedPlaceId}
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
            setMarker={this.setMarker}
            onMapLoaded={this.setInitialPlacesList}
            places={places}
            selectedPlaceId={selectedPlaceId}
            handlePlaceSelection={this.handlePlaceSelection}
          />
        </div>
      </div>
    );
  }
}

export default App;
