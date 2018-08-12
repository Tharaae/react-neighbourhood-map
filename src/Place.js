import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

/*
 * Place component is functional/stateless component
 * used to display every list item in PlacesList component
 */
const Place = (props) => {

  //Current selected/clicked place is passed from parent PlacesList component.
  const {place, handlePlaceSelection, selectedPlaceId, listOpen} = props;

  //So, this Place is styled as selected if it is the currently selected one.
  return (
    <div
      id={place.id}
      className= {place.id === selectedPlaceId? "place place-selected" : "place"}
      onClick={() => handlePlaceSelection(place.id)}
    >
      <a
        tabIndex = {listOpen ? "0" : "-1"}
        onKeyUp={(event) => {
          event.preventDefault();
          if (event.keyCode === 13) {
            handlePlaceSelection(place.id);
          }
        }}
      >
        {place.name}
      </a>
    </div>
  );
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  selectedPlaceId: PropTypes.string,
  listOpen: PropTypes.bool,
  handlePlaceSelection: PropTypes.func.isRequired
};

export default Place;
