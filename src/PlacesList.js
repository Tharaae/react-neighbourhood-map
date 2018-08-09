import React, { Component } from 'react';
import Place from './Place';
import sortBy from 'sort-by';
import './App.css';

/*
 * PlacesList component is a state component used to display the places list.
 * It uses Place component for every list item.
 */
class PlacesList extends Component {

  state = {
    // the place currently selected/clicked by the user (initially null)
    selectedPlaceId: ''
  }

  constructor() {
    super();
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
  }

  /*
   * Does the actions needed when a child Place is clicked/selected.
   * Takes the newly selected/clicked Place component as argument.
   */
  handlePlaceSelection(newPlaceId) {
    // set selected place state to the clicked one
    this.setState({selectedPlaceId: newPlaceId});

    // run handlePlaceSelection function passed from parent App component
    // to handle correnponding map marker selection
    this.props.handlePlaceSelection(newPlaceId);
  }

  /*
   * Clear place selection when new search takes place before re-rendering
   */
  shouldComponentUpdate(nextProps, nextState) {
    // if PlaceList is re-rendering due to new search (filtered list changed),
    // then set the currently selected place to null to re-render accordingly.
    if(nextProps.places.length !== this.props.places.length && nextState.selectedPlaceId !== '') {
      this.setState({selectedPlaceId: ''});
    } else if(nextProps.selectedPlaceId !== this.state.selectedPlaceId) {
      this.setState({selectedPlaceId: nextProps.selectedPlaceId});
    }
    return true;
  }

  render() {
    const {places} = this.props;
    const {selectedPlaceId} = this.state;

    // get sorted list by place name
    const sortedPlaces = places.sort(sortBy('name'));

    // pass selected place id to Place components to style accordingly
    return (
      <ol className="list" aria-label = "Filtered parks list">
        {sortedPlaces.map((place) => (
          <li key={place.id}>
            <Place
              place={place}
              selectedPlaceId={selectedPlaceId}
              handlePlaceSelection={this.handlePlaceSelection}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default PlacesList;
