import React from 'react';
import Place from './Place';
import './App.css';

const PlacesList = (props) => {
  const {places, handlePlaceSelection} = props;

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
            handlePlaceSelection={handlePlaceSelection}
          />
        </li>
      ))}
    </ol>
  );
};

export default PlacesList;
