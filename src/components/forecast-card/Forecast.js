import React from 'react'
import './forecast.css'
import ForecastItem from '../forecast-item/ForecastItem'

const Forecast = ({ forecast }) => {
  console.log(forecast)
  return (
    <div className='forecast-container'>
      <h4>3-DAY FORECAST</h4>
      <div className='forecast-days-container'>
        {forecast.map(forecastDay => (
          <ForecastItem forecastDay={forecastDay} key={forecast.id}/>
        ))}
      </div>
    </div>
  )
}

export default Forecast