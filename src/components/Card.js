import React from 'react'

const Card = (props) => {
  if (!props.weather) {
    return (
      <div>
        Loading...
      </div>
  )
  } else {
    const temperature = Math.floor(props.weather.main.temp)
    const city = props.weather.name
    const country = props.weather.sys.country
    const description = props.weather.weather[0].description
    return (
      <div id="card">
        <div className="card text-center" id="weather-card">
          <img className="card-img-top" id="weather-img" src={require("../assets/img/sunny-day.jpg")} alt="sunny day" />
          <div className="card-img-overlay">
            <div className="temperature-display">
              <div>
                {temperature}
                <i id="temp-icon" className="wi wi-fahrenheit"/>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {city}, {country}
            </h5>
            <p className="card-text">
              {description}
            </p>
            <div className="card-footer">
              <img id="form-icon" src={require("../assets/svg/plus.svg")} alt="add-new-forecast" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card