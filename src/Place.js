import React from 'react';
import './App.css';

const Place = (props) => {
  const {place} = props;
  console.log('Place render', place.name);

  return (
    <div className="place">
      <h4>{place.name}</h4>
    </div>
  );
};

export default Place;
