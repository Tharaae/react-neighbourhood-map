import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesList from './PlacesList';
import './App.css';

/*
 * SearchPlaces component is state component to handle search among PlacesList
 * and filtering Places accordingly
 */
class SearchPlaces extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired,
    selectedPlaceId: PropTypes.string,
    listOpen: PropTypes.bool,
    handlePlaceSelection: PropTypes.func.isRequired,
    getFilteredPlacesList: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
  }

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

    // if trimed lowercase new query is different than current one
    if (query !== this.state.query) {
      // run handleSearch function passed from parent App component
      // to handle correnponding map markers filtering
      this.props.handleSearch(query);

      // set query state to new serch term to re-render accordingly
      this.setState({query});
    }
  }

  render() {
    const {
      places,
      selectedPlaceId,
      listOpen,
      handlePlaceSelection,
      getFilteredPlacesList
    } = this.props;

    const {query} = this.state;

    // get filtered set of places according to the new query
    // using the filtering method passed by App component
    const filteredPlaces = getFilteredPlacesList(places, query);

    return (
      <section
        id = "list-panel"
        className = {"list-panel" + (listOpen ? "" : " list-panel-closed")}
        aria-label = "Places List Section"
      >
        <input
          tabIndex = {listOpen ? "0" : "-1"}
          type = "text"
          role = "search"
          aria-label = "Search parks list by park name or area"
          className = "search-input"
          placeholder = "Search by park name or area"
          onChange = {(event) => this.handleChange(event.target.value)}
        />
        <PlacesList
          places = {filteredPlaces}
          selectedPlaceId = {selectedPlaceId}
          listOpen = {listOpen}
          handlePlaceSelection = {handlePlaceSelection}
        />
      </section>
    );
  }
}

export default SearchPlaces;
