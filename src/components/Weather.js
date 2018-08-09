import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import config from '../config'

class Weather extends Component {
  state = {
    stateLoaded: false,
    forecasts: [
      { id: 1, city: 'denver', country: 'us' }
    ],
    cardArray: []
  }

  componentDidMount() {
    this.mapForecasts()
  }

  mapForecasts() {
    const { forecasts } = this.state
    forecasts.map(async (forecast) => {
      await this.getForecast(forecast, this.cardArrayLoaded)
    })
  }

  cardArrayLoaded = (forecast, data) => {
    const card = (<Card key={forecast.id} id={forecast.id} weather={data} />)
    this.setState({
      cardArray: [...this.state.cardArray, card],
      stateLoaded: !this.state.stateLoaded
    }, console.log('setState() invoked'))
  }

  getForecast = async (forecast, callback) => {
    const { apiConnection } = config
    console.log('getForecast() invoked')
    await axios.get(`${apiConnection.link}${forecast.city},${forecast.country}&appid=${apiConnection.key}&units=imperial`)
      .then(res => {
        console.log('Response OK')
        return callback(forecast, res.data)
      })
      .catch(error => {
        console.log(error)
        return error;
      })
  }
  
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
        {this.state.cardArray.map(card => {
          return card
        })}
        </div>
      )
    }
  }
}

export default Weather