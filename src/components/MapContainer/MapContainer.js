import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import './MapContainer.css';

export class MapContainer extends Component {

  constructor() {
    super();
    this.state = {
      activeMarker: {},
      currentCoordinates: {},
      showingInfoWindow: false,
      crop: '',
      value: ''
    }
  }

  initMap(props, map) {
    map.setMapTypeId('satellite');
    map.setTilt(45);
    map.set('streetViewControl', false);
  }

  onMapClicked(props, map, e) {
    const currentCoordinates = { x: e.latLng.lat(), y: e.latLng.lng() };

    fetch(`http://localhost:8080/top_crops?x=${currentCoordinates.x}&y=${currentCoordinates.y}&n=1`).then(response => {
      response.json().then(data => {
        const top = data.data;
        let crop, value;
        if (top.length === 0) {
          crop = 'No Production';
          value = 0;
        } else {
          crop = top[0][0],
          value = top[0][1];
        }
        this.setState({
          activeMarker: e.latLng,
          currentCoordinates: currentCoordinates,
          showingInfoWindow: true,
          crop: crop,
          value: value
        });
      })
    });
  }

  onMarkerClicked(props, marker, e) {
    this.setState({
      showingInfoWindow: true
    });
  }

  render() {
    return (
      <div>
        <Map google={ this.props.google } zoom={ 10 }
            onReady={ (props, map) => this.initMap(props, map) }
            onClick={ (props, map, e) => this.onMapClicked(props, map, e) }>

          {/* <Marker position={ {} } onClick={ (props, marker, e) => this.onMarkerClicked(props, marker, e) } /> */}

          <InfoWindow position={ this.state.activeMarker } visible={ this.state.showingInfoWindow }>
            <div>
              <h1>{ `${this.state.crop}: ${this.state.value}` }</h1>
            </div>
          </InfoWindow>

        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAcrDZFaBO6jGznTGYK-O6jSxs7FQDlzy0')
})(MapContainer)
