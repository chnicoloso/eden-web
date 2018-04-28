import React, { Component } from 'react';
import MapContainer from '../MapContainer/MapContainer';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-title">Eden</div>
        </div>
        <MapContainer />
      </div>
    );
  }
}

export default App;
