import './hour-item.css'

const HourItem = ({ hour }) => {
  const formattedTime = (time) => {
    const newTime = new Date(time * 1000)
    return newTime.toLocaleTimeString([], { hour: "2-digit" }).split(' ').join('').replace(/^0/, '')
  }

  return (
    <div className='hour-item'>
      <p className='formatted-time'>{formattedTime(hour.time_epoch)}</p>
      <img src={hour.condition.icon} alt='icon' />
      <p className='rain-percent'>
        {hour.chance_of_rain > 0 ? hour.chance_of_rain + '%' : null}
      </p>
      <p>{Math.round(hour.temp_f)}°</p>
    </div>
  )
}

export default HourItem