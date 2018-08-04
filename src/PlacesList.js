import React from 'react';
import Place from './Place';
import './App.css';

const PlacesList = (props) => {
  const {places} = props;
  console.log('PlacesList render list', places);
  return (
    <ol className="list">
      {places.map((place) => (
        <li key={place.id}>
          <Place place={place} />
        </li>
      ))}
    </ol>
  );
};

export default PlacesList;
