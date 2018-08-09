import React from 'react'

const Card = (props) => {
  return (
    <div>
      <div className="card text-center" id="weather-card">
        <img className="card-img-top" id="weather-img" src={require("../assets/img/sunny-day.jpg")} alt="sunny day" />
        <div className="card-img-overlay">
          <div className="temperature-display">
            <div>
              {/* {Math.floor(props.forecast.temperature)} */}
              <i id="temp-icon" className="wi wi-fahrenheit" />
            </div>
          </div>
          {/* <div className="conditions">{props.forecast.description}</div> */}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {/* {props.forecast.city}, {props.forecast.country} */}
          </h5>
          <p className="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, expedita enim. Iusto officia architecto id.
                </p>
          <div className="card-footer">
            <img id="form-icon" src={require("../assets/svg/plus.svg")} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card