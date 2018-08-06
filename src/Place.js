import React from 'react';
import './App.css';

/*
 * Place component is functional/stateless component
 * used to display every list item in PlacesList component
 */
const Place = (props) => {

  //Current selected/clicked place is passed from parent PlacesList component.
  const {place, handlePlaceSelection, selectedPlaceId} = props;

  //So, this Place is styled as selected if it is the currently selected one.
  return (
    <div
      id={place.id}
      className= {place.id === selectedPlaceId? "place place-selected" : "place"}
      onClick={() => handlePlaceSelection(place.id)}
    >
      {place.name}
    </div>
  );
}

export default Place;
