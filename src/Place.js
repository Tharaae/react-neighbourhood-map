import React, {Component} from 'react';
import './App.css';

class Place extends Component {
  // state = {
  //   selected: this.props.place.selected
  // }

  /*
   *
   */
  handleClick(event) {
    const {place, handlePlaceSelection} = this.props;
    let prevSelectedId = null;

    // get previously selected place
    const prevSelected = document.getElementsByClassName('place-selected');
    console.log('in Place prev selected array', prevSelected);
    // Reset previously clicked places styling
    for(let i=0; i < prevSelected.length; i++) {
      console.log('in Place prev selected place found', prevSelected[i]);
      prevSelectedId = prevSelected[i].id;

        prevSelected[i].classList.remove('place-selected');

    };

    // // Stlye the newly clicked place
     event.target.classList.add('place-selected');
     console.log('in Place newly selected place', event.target);
    //this.setState({selected: true});

    // call place selection handling function from parent component
    handlePlaceSelection(place, prevSelectedId);
  }

  render() {

    const {place} = this.props;
    console.log('Place render entered', place);

    return (
      <div
        id={place.id}
        className= {place.selected? "place place-selected" : "place"}
        onClick={(event) => this.handleClick(event)}
      >
        {place.name}
      </div>
    );
  }
}

export default Place;
