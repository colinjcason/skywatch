import React from 'react'
import './forecast-item.css'

const ForecastItem = ({ forecastDay }) => {
  const { day, date } = forecastDay

  const getDayOfWeek = (day_date) => {
    const date = new Date(day_date.replace(/-/g, '/').replace(/T.+/, '')).getDay()
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date]
  }

  return (
    <div className='forecast-day'>
      {getDayOfWeek(date)}
      <img src={day.condition.icon} alt='weather condition' />
      <p>{Math.round(day.avgtemp_f)}°</p>
    </div>
  )
}

export default ForecastItem