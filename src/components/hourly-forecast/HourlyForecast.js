import React from 'react'
import HourItem from '../hourly-item/HourItem'
import './hourly-forecast.css'

const HourlyForecast = ({ hourly }) => {
  return (
    <div>
      <div className='hourly-container'>
        {hourly.map(hour => (
          <HourItem hour={hour} key={hour.time} />
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast