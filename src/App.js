import React, { Component } from 'react'
import Weather from './components/Weather'

import './assets/css/weather-icons.css'
import './assets/css/App.css'

class App extends Component {
  render() {
    return (
      <div id="container" id="app-container">
        <Weather />
      </div>
    );
  }
}

export default App;
