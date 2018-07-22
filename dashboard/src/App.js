import React, { Component } from 'react';
import './App.css';

// SocketIO
import openSocket from 'socket.io-client';

// import Component
import MapContainer from './Components/MapContainer'
import RequestCollection from './Components/RequestCollection';

// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'

// import ui




class App extends Component {
  constructor() {
    super();
    this.state = {
      requests: undefined,
      req_map: undefined      // Only keeps one request per case? (Latest request)
    };

    // Open Socket
    this.socket = openSocket("http://localhost:8000");
    this.initSocket();

  }
  
  updateReqMap = () => {
    let req = this.state.requests;
    
    var req_map = {}

    for(var i = 0; i < req.length; i++) {
      if (!(req[i].case_id in req_map)) {
        // Empty entry
        req_map[req[i].case_id] = req[i];
      } else {
        // Update with most recent request
        if ( Date(req[i].timestamp) > Date(req_map[req[i].case_id].timestamp) ) {
          req_map[req[i].case_id] = req[i]
        }
      }
    }
    
    // Convert Object to an array of objects
    var res = Object.values(req_map);
    
    this.setState({
      req_map: res
    });
  }

  initSocket = () => {
    // Update request from server
    this.socket.on('request-update', (data) => {
      let case_id = data.case_id
      let req_map = this.state.req_map;

      // console.log(data);

      let found_flag = false;
      for (var i = 0; i < req_map.length; i++) {
        if (req_map[i].case_id == case_id) {
          // Update request
          req_map[i].latitude = data.latitude;
          req_map[i].longitude = data.longitude;
          req_map[i].timestamp = data.timestamp;
          found_flag = true;
        }
      }

      if (!found_flag) {
        let req = {
          case_id: "" + data.case_id,
          timestamp: "",
          latitude: 0.0 + data.latlng.lat,
          longitude: 0.0 + data.latlng.lng
        }
        req_map.push(req);
        console.log(req);
      }

      this.setState({
        req_map: req_map
      });



    });
  };

  componentDidMount() {
    // const api_addr = "https://safety-server.herokuapp.com/api/req";
    
    const api_addr = "http://localhost:8000/api/req";

    

    // Fetch Data
    fetch(api_addr, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data.slice(0, 20));
      console.log(data.length);
      this.setState({
        requests: data.slice() 
      });
    })
    .then(() => {
      this.updateReqMap();
    });
  }
  
  render() {
    return (
        <div>
          <RequestCollection requests={this.state.req_map} />
          <MapContainer google={this.props.google} requests={this.state.req_map} />
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRkw7Lzkby2rK2AWoEenHlX_RQ19A_Hp0',
})(App)
