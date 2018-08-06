import React from 'react';
import './App.css';

const Place = (props) => {
  const {place, handlePlaceSelection, selectedPlaceId} = props;

  return (
    <div
      id={place.id}
      className= {place.id === selectedPlaceId? "place place-selected" : "place"}
      onClick={() => handlePlaceSelection(place)}
    >
      {place.name}
    </div>
  );
}

export default Place;
