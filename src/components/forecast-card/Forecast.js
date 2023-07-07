import React from 'react'
import './forecast-card.css'
import ForecastItem from '../forecast-item/ForecastItem'

const Forecast = ({ forecast }) => {
  console.log(forecast)
  return (
    <div className='forecast-container'>
      <h4>Forecast</h4>
      {forecast.map(forecastDay => (
        <ForecastItem forecastDay={forecastDay} />
      ))}
    </div>
  )
}

export default Forecast