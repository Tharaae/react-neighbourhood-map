import React, { Component } from 'react';
import Place from './Place';
import './App.css';

/*
 * PlacesList component is a state component used to display the places list.
 * It uses Place component for every list item.
 */
class PlacesList extends Component {

  state = {
    // the place currently selected/clicked by the user (initially null)
    selectedPlace: null
  }

  constructor() {
    super();
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
  }

  /*
   * Does the actions needed when a child Place is clicked/selected.
   * Takes the newly selected/clicked Place component as argument.
   */
  handlePlaceSelection(place) {
    // the previously selected Place item
    const {selectedPlace} = this.state;

    // if there is there's no previously selected place
    // OR if the previously selected place is different than that newly selected
    if(place && (!selectedPlace || place.id !== selectedPlace.id)) {
      // set the current selected place state to the newly clicked one
      // to re-render accordingly
      this.setState({selectedPlace: place});

      // run handlePlaceSelection function passed from parent App component
      // to handle correnponding map marker selection
      this.props.handlePlaceSelection(place.id);
    }
  }

  /*
   * Clear place selection when new search takes place before re-rendering
   */
  shouldComponentUpdate(nextProps, nextState) {
    // if PlaceList is re-rendering due to new search (filtered list changed),
    // then set the currently selected place to null to re-render accordingly.
    if(nextProps.places.length !== this.props.places.length && nextState.selectedPlace) {
      this.setState({selectedPlace: null});
    }
    return true;
  }

  render() {
    const {places} = this.props;
    const {selectedPlace} = this.state;

    // pass selected place id to Place components to style accordingly
    return (
      <ol className="list">
        {places.map((place) => (
          <li key={place.id}>
            <Place
              place={place}
              selectedPlaceId={selectedPlace? selectedPlace.id : null}
              handlePlaceSelection={this.handlePlaceSelection}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default PlacesList;
