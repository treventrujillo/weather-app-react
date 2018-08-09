import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'

import Card from './Card'

class Weather extends Component {
  state = {
    stateLoaded: false,
    cardArray: [],
    forecasts: [
      { id: 1, city: 'denver', country: 'us' }
    ]
  }

  // Called on DOM load.
  componentDidMount() {
    this.mapForecasts()
  }
  
  // Map forecasts from component state into forecast HTTP request method.
  mapForecasts() {
    const { forecasts } = this.state
    forecasts.map(async (forecast) => {
      // Passing in the forecast and a callback method to the HTTP get method 'getForecast'.
      await this.getForecast(forecast, this.cardArrayLoaded)
    })
  }

  // Constructs a Card component with forecast data and adds the card to the cardArray in the component's state.
  cardArrayLoaded = (forecast, data) => {
    const card = (<Card key={forecast.id} id={forecast.id} weather={data} />)
    this.setState({
      cardArray: [...this.state.cardArray, card],
      // Switch stateLoaded from false to true so UI knows it can render the card.
      stateLoaded: !this.state.stateLoaded
    }, console.log('setState() invoked'))
  }

  // Makes HTTP request to openweather api using forecast parameters and returning provided callback.
  getForecast = async (forecast, callback) => {
    const { apiConnection } = config
    console.log('getForecast() invoked')
    await axios.get(`${apiConnection.link}${forecast.city},${forecast.country}&appid=${apiConnection.key}&units=imperial`)
    .then(res => {
      console.log('Response OK')
        // Returning a callback function with the response data ensures setState is not called before request is finished.
        return callback(forecast, res.data)
      })
      .catch(error => {
        console.log(error)
        return error;
      })
  }
  
  // If state isn't finished loading, UI will return Loading.
  // Once state has loaded, UI will render cards to DOM.
  render() {
    const { stateLoaded } = this.state

    if (!stateLoaded) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className="weather-container">
          {this.state.cardArray.map(card => { return card })}
        </div>
      )
    }
  }
}

export default Weather