import React, {Component} from 'react';
import PlacesList from './PlacesList';
import './App.css';

class SearchPlaces extends Component {
  state = {
    query: ''
  }

  handleChange(q) {
    const query = q.trim().toLowerCase();
    if(query !== this.state.query) {
      this.props.handleSearch(query);
      this.setState({query});
    }
  }

  render() {
    const {places, handlePlaceSelection} = this.props;
    const {query} = this.state;

    const filteredPlaces = places.filter((place) => place.name.toLowerCase().includes(query));

    return (
      <div id="list-panel" className="list-panel">
        <input
            type="text"
            className="search-input"
            placeholder="Search by park name"
            onChange={(event) => this.handleChange(event.target.value)}
          />
        <PlacesList
          places={filteredPlaces}
          handlePlaceSelection={handlePlaceSelection}
        />
      </div>
    );
  }
}

export default SearchPlaces;
