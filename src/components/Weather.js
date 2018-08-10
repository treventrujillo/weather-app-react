import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'

import Carousel from 'nuka-carousel'
import Card from './Card'

class Weather extends Component {
  state = {
    stateLoaded: false,
    cardArray: [],
    forecasts: [
      { id: 1, city: 'denver', country: 'us' },
      { id: 2, city: 'seattle', country: 'us' }
    ]
  }

  // Called on DOM load.
  componentDidMount() {
    this.mapForecasts()
  }
  
  // Map forecasts from component state into forecast HTTP request method.
  mapForecasts() {
    const { forecasts, stateLoaded } = this.state
    // Capture forecasts length and initialize iterator so when iterator is equal to forecasts length.
    const forecastLength = forecasts.length;
    let i = 0;
    forecasts.map(async (forecast) => {
      // Passing in the forecast and a callback method to the HTTP get method 'getForecast'.
      await this.getForecast(forecast, this.cardArrayLoaded); i++;
      // All the cards have been loaded and we can display the UI.
      if (i === forecastLength) {
          this.setState({ stateLoaded: !stateLoaded })
          console.log('State Loaded')
        }
      })
  }

  // Constructs a Card component with forecast data and adds the card to the cardArray in the component's state.
  cardArrayLoaded = (forecast, data) => {
    const { cardArray } = this.state
    const card = (<Card key={forecast.id} id={forecast.id} weather={data} />)
    this.setState({
      cardArray: [...cardArray, card],
    }, console.log('cardArray populated.'))
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

  generateCarouselIndicators(cards) {
    let elements = []
    for (let i = 0; i < cards.length;) {
      if (i === 0) {
        elements.push(<li key={i} data-target="#carousel" data-slide-to="0" className="active"></li>)
        i++;
      }
        elements.push(<li key={i} data-target="#carousel" data-slide-to={i} ></li>)
        i++;
    }
    return elements
  }

  generateCards(cards) {
    const { cardArray } = this.state
    let elements = []
    for (let i = 0; i < cards.length;) {
      if (i === 0) {
        elements.push(<div key={i} className="carousel-item active">
          {cardArray[i]}
        </div>)
        i++;
      }
        elements.push(<div key={i} className="carousel-item">
          {cardArray[i]}
        </div>)
        i++;
    }
    return elements
  }
  
  // If state isn't finished loading, UI will return Loading.
  // Once state has loaded, UI will render cards to DOM.
  render() {
    const { stateLoaded, cardArray } = this.state

    if (!stateLoaded) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className="weather-container container">
          <Carousel
            cellAlign='center'
          >
            {cardArray.map(x => {return x})}
          </Carousel>
        </div>
      )
    }
  }
}

export default Weather