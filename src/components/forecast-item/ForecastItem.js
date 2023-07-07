import React from 'react'

const ForecastItem = ({ forecastDay }) => {
  const { day } = forecastDay

  return (
    <div>
      {day.avgtemp_f}
    </div>
  )
}

export default ForecastItem