import React, {Component} from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";

class MapComponent extends Component {
  
  render() {
    console.log('MapComponent render');
    const {defaultCenter, defaultZoom, setMap} = this.props;

    return (
      <GoogleMap
        ref={map => setMap(map)}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      />
    );
  }

}

export default MapComponent;
