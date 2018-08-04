import React from 'react';
import './App.css';

const Place = (props) => {
  const {place} = props;
  console.log('Place render', place.name);

  return (
    <div className="place">
      {place.name}
    </div>
  );
};

export default Place;
