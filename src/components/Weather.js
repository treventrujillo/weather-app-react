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

  componentDidMount () {
  //  this.mapCards()
  }

  mapCards() {
    const { forecasts } = this.state
    const tempArray = []
    forecasts.map(forecast => {
       tempArray.push(<Card key={forecast.id} forecast={forecast} />)
    })
    this.mapForecasts(tempArray)
  }

  mapForecasts = (cardDataArray) => {
    const { stateLoaded } = this.state

    cardDataArray.forEach(card => {
      const weather = this.getForecast(card.forecast) 
    })
  }

  getForecast = (forecast) => {
    axios.get(`${config.apiLink}${forecast.city},${forecast.country}&appid=${config.apiKey}&units=imperial`)
      .then(res => {
        return res.data.weather
      })
      .catch(error => {
        alert(`Error: ${error.message}`)
        console.log(error)
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