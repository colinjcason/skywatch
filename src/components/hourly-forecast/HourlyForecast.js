import React from 'react'
import HourItem from '../hourly-item/HourItem'
import './hourly-forecast.css'

const HourlyForecast = ({ hourly }) => {
  console.log(hourly)
  return (
    <div>
      <div className='hourly-container'>
        {hourly.map(hour => (
          <HourItem hour={hour} key={hour.id}/>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast