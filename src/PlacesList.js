import React, {Component} from 'react';
import Place from './Place';
import './App.css';

class PlacesList extends Component {

  state = {
    selectedPlace: null
  }

  constructor() {
    super();
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
  }

  handlePlaceSelection(place) {
    const {selectedPlace} = this.state;

    if(place && (!selectedPlace || place.id !== selectedPlace.id)) {
      this.setState({selectedPlace: place});
      this.props.handlePlaceSelection(place.id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.places.length !== this.props.places.length && nextState.selectedPlace) {
      this.setState({selectedPlace: null});
    }
    return true;
  }

  render() {
    const {places} = this.props;
    const {selectedPlace} = this.state;

    // Reset previously clicked places styling
    const prevSelected = document.getElementsByClassName('place-selected');
    for(let i=0; i < prevSelected.length; i++) {
      prevSelected[i].classList.remove('place-selected');
    };

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
