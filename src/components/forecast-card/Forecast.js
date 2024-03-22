import React from 'react'
import './forecast.css'
import ForecastItem from '../forecast-item/ForecastItem'

const Forecast = ({ forecast }) => {
  return (
    <div className='forecast-container'>
      <h4>3-DAY FORECAST</h4>
      <div className='forecast-days-container'>
        {forecast.map(forecastDay => (
          <ForecastItem forecastDay={forecastDay} key={forecastDay.date}/>
        ))}
      </div>
    </div>
  )
}

export default Forecast