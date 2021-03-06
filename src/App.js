import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import MapComponent from './MapComponent';
import SearchPlaces from './SearchPlaces';
import {parks} from './parks-list.js';
import './App.css';

class App extends Component {
  state = {
    // initial center
    defaultCenter: { lat: -33.71697, lng: 150.9171843 },
    // initial zoom
    defaultZoom: 10,
    // places list (to be fetched by setInitialPlacesList)
    places: [],
    // currently selected place id (initiall set to empty string)
    selectedPlaceId: '',
    // status of parks list panel (closed or open)
    listOpen: true,
    // status of marker info window (closed or open)
    infoOpen: false
  }

  constructor() {
    super();
    this.googleMapsAPIsURL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA83ru5Va-VflHbHHAxRcz1TV9QMspFJa0&force=pwa';
    this.setInitialPlacesList = this.setInitialPlacesList.bind(this);
    this.getStaticPlacesList = this.getStaticPlacesList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  /*
   * Fetches initial places array.
   * It gets the nearby parks to the center location using Google Maps APIs.
   * If Google Maps APIs are not available, then from static list.
   */
  setInitialPlacesList() {
    // if places array not fetched yet
    if(this.state.places.length === 0) {
      const {defaultCenter} = this.state;
      const google = window.google;

      // if Google Maps APIs available
      if (google && google.maps) {
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        // get nearby places with place type 'park' within 2km of center
        service.nearbySearch(
          {
            location: new google.maps.LatLng(defaultCenter.lat,defaultCenter.lng),
            radius: 30000,
            type: ['park'],
            keyword: 'national park'
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
              } else { //if no places retrieved, get places data from static array
                this.getStaticPlacesList();
                console.log('No places retrieved!');
              }
            } else {//if error occured, get places data from static array
              this.getStaticPlacesList();
              console.log(`Error ${status} occured.`);
            }
          }
        );
      } else { // if Google Maps APIs is not available, get places data from static array
        this.getStaticPlacesList();
        console.log('Google Maps is not available!');
      }
    }
  }

  /*
   * Gets places list data from static JS file.
   * This function is called in case zero places by Google Maps APIs
   * or any error occured while retrieving the list.
   * It makes places list content always available, even offline.
   */
  getStaticPlacesList() {
    //set places to parks imported from parks-list.js
    const places = parks;
    places.forEach((place) => {
      // initially set all places as visible (for markers display)
      place['visible'] = true;
    });
    // set places state to rerender
    this.setState({places});
  }

  /*
   * Gets the filtered list of places according to the provided query.
   * Used in multiple places. So, it's important to have the filtering method
   * as a single function in the main app for consistency across the code.
   */
  getFilteredPlacesList(places, query) {
    // return places whose name or address(vicinity) includes the keyword
    return places.filter((place) =>
      place.name.toLowerCase().includes(query) ||
      place.vicinity.toLowerCase().includes(query)
    );
  }

  /*
   * Does actions required when a new search takes place.
   * Takes newly entered serch term/query as argument.
   * Thsi function is pased to SearchPlaces component to run onChange
   */
  handleSearch(query) {
    const {places} = this.state;
    // get new search results
    const results = this.getFilteredPlacesList(places, query);
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
      this.setState({
        places,
        selectedPlaceId: '',
        infoOpen: false
      });
    }
  }

  /*
   * Does actions required when new place clicke/selected by user.
   * This function is passed to PlacesList component to run onClick.
   */
  handlePlaceSelection(selectedPlaceId) {
    // set selectedPlaceId to the newly select place to re-render accordingly
    this.setState({selectedPlaceId});
    this.setState({infoOpen: true});
  }

  /*
   * Closes/Opens the parks list panel and sets listOpen state to re-render
   */
  toggleListStatus() {
    const {listOpen} = this.state;
    document.getElementById('map-container').classList.toggle('map-container-expanded');
    this.setState({listOpen: !listOpen});
  }

  /*
   * Flags selected place marker info window as closed to re-render accordingly.
   * This function to called by InfoWindow onCloseClick in MapComponent
   * to allow info window re-open when already selected place
   * (list item or map marker) is clicked after closing info window.
   */
  closeInfo() {
    this.setState({infoOpen: false});
  }

  render() {
    const {
      defaultCenter,
      defaultZoom,
      places,
      selectedPlaceId,
      listOpen,
      infoOpen
    } = this.state;

    return (
      <div id="app" className="app">
        <header className="app-header">
          <h1><a href="/">City National Parks</a></h1>
          <button
            className="menu-button"
            aria-label="open or close parks list panel"
            onClick={()=> this.toggleListStatus()}
          >
            &#9776;
          </button>

        </header>

        <main className="main">

          <SearchPlaces
            places={places}
            selectedPlaceId={selectedPlaceId}
            listOpen={listOpen}
            handleSearch={this.handleSearch}
            handlePlaceSelection={this.handlePlaceSelection}
            getFilteredPlacesList={this.getFilteredPlacesList}
          />

          <ErrorBoundary handleMapError={this.getStaticPlacesList}>
            <MapComponent
              googleMapURL={this.googleMapsAPIsURL}
              loadingElement={<div />}
              containerElement={
                <section
                  id="map-container"
                  className="map-container"
                  role="application"
                  aria-label="map with parks markers"
                  tabIndex="0"
                />}
              mapElement={<div className="map"/>}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              places={places}
              selectedPlaceId={selectedPlaceId}
              infoOpen={infoOpen}
              onMapLoaded={this.setInitialPlacesList}
              handlePlaceSelection={this.handlePlaceSelection}
              closeInfo={this.closeInfo}
            />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default App;
