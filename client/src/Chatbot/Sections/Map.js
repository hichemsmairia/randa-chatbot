import React, { Component } from "react";
import { Map, HeatMap, GoogleApiWrapper } from "google-maps-react";

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];

class MapContainer extends Component {
  
  render() {
    return (
     
        <Map  style={{"height": "500px" ,"width":"320px"}}
          google={this.props.google}
          className={"map"}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
        >
          <HeatMap
            gradient={gradient}
            positions={this.props.positions}
            opacity={0.5}
            radius={20}
          />
        </Map>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2Xs-z_6J5CaLDKful_xcJ8neoKVM2-Qk",
  libraries: ["visualization"]
})(MapContainer);
