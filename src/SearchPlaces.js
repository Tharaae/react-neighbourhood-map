import React, { Component } from 'react';
import PlacesList from './PlacesList';
import './App.css';

/*
 * SearchPlaces component is state component to handle search among PlacesList
 * and filtering Places accordingly
 */
class SearchPlaces extends Component {
  state = {
    // current serch term/query entered by user (initially empty string)
    query: ''
  }

  /*
   * Does actions needed when Search field value is changed by user
   */
  handleChange(q) {
    // remove new value side spaces and convert to lowercase
    // to make search not case-sensetive
    const query = q.trim().toLowerCase();

    console.log('SearchPlaces handleChange function', query);
    // if trimed lowercase new query is different than current one
    if (query !== this.state.query) {
      console.log('SearchPlaces handleChange function: query changed so call App handleSearch');
      // run handleSearch function passed from parent App component
      // to handle correnponding map markers filtering
      this.props.handleSearch(query);

      // set query state to new serch term to re-render accordingly
      this.setState({query});
    }
  }

  render() {
    const {places, handlePlaceSelection} = this.props;
    const {query} = this.state;

    // get filtered set of places according to the new query
    const filteredPlaces = places.filter((place) => place.name.toLowerCase().includes(query));

    return (
      <div
        id = "list-panel"
        className = "list-panel"
      >
        <input
          type = "text"
          className = "search-input"
          placeholder = "Search by park name"
          onChange = {(event) => this.handleChange(event.target.value)}
        />
        <PlacesList
          places = {filteredPlaces}
          handlePlaceSelection = {handlePlaceSelection}
        />
      </div>
    );
  }
}

export default SearchPlaces;
