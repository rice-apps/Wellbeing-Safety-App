
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { relative } from 'path';

export default class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      parentWidth: undefined,
      parentHeight: undefined,
      style: {
        width: '0px', // 90vw basically means take up 90% of the width screen. px also works.
        height: '0px' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
      }
    }
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const { google } = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: { lat: 29.71652382, lng: -95.39760886 }, // sets center of google map to NYC.
        zoom: 14, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
    }
  }

  updateMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      if (this.props.requests != null) {
        const { google } = this.props; // sets props equal to google
        const { requests } = this.props;
        // this.props.requests.forEach( req => { // iterate through locations saved in state
        //   const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
        //     position: {lat: req.latitude, lng: req.longitude}, // sets position of marker to specified location
        //     map: this.map, // sets markers to appear on the map we just created on line 35
        //     label: req.key // the title of the marker is set to the name of the location
        //   });
        // });

        for (var i = 0; i < requests.length; i++) {
          let req = requests[i];
          const marker = new google.maps.Marker({
            position: {lat: req.latitude, lng: req.longitude},
            map: this.map,
            label: i.toString()
          });
        }

      };
    }
  }
  
  componentDidMount() {
    const parentWidth = this.refs.map.parentNode.clientWidth;

    this.setState({
      style: {
        width: parentWidth * 0.8,
        height: parentWidth * 0.8,
        position: relative
      }
    })

    this.loadMap(); // call loadMap function to load the google map
  }

  componentDidUpdate() {
    this.updateMap();
  }

  render() {
    return ( // in our return function you must return a div with ref='map' and style.
      <div>
        <h3> Map </h3>
        <div ref="map" style={this.state.style}>
          
        </div>
      </div>
    )
  }
}