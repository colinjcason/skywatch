import { useState, useEffect } from 'react'
import SearchBox from './components/search-box/SearchBox';
import Forecast from './components/forecast-card/Forecast';
import HourlyForecast from './components/hourly-forecast/HourlyForecast';
import Switch from './components/theme-switcher/Switch'
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [location, setLocation] = useState('')
  const [currentTemp, setCurrentTemp] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [hiTemp, setHiTemp] = useState('')
  const [lowTemp, setLowTemp] = useState('')
  const [forecast, setForecast] = useState([])
  const [hourly, setHourly] = useState([])
  const [searchField, setSearchField] = useState('san diego')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    getWeather()
  }, [])

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getWeather = () => {    
    if(searchField === '') {
      alert('Please enter a city for weather data.')
    } else {
      return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchField}&days=3&aqi=no&alerts=yes`)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then(data => {
        setWeatherData(data)
        setCurrentTemp(data.current.temp_f)
        setDescription(data.current.condition.text)
        setIcon(data.current.condition.icon)
        setHiTemp(data.forecast.forecastday[0].day.maxtemp_f)
        setLowTemp(data.forecast.forecastday[0].day.mintemp_f)
        setForecast(data.forecast.forecastday)
        setHourly(data.forecast.forecastday[0].hour)
        setLocation(data.location.name)
        setSearchField('')
        console.log(data)
      })
      .catch(error => {
        alert('Please enter a valid city name.')
        setSearchField('')
        console.error('There was a problem with the Fetch operation:', error)
      })
    }
  }

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleSearch = () => {
      getWeather()
  }

  const handleThemeSelection = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <div className={`App ${theme}`}>
      <Switch handleThemeSelection={handleThemeSelection} theme={theme} />

      <div className='stats'> 
        <h2 className='location'>{location}</h2>
        <h1 className='main-temp'>{Math.round(currentTemp)}°</h1>
        <div className='description-container'>
          <p id='description'>{description}</p>
          <img src={icon} alt='weather condition'/>
        </div>
        <div className='hi-lo'>
          <p>H:{Math.round(hiTemp)}°</p>
          <p>L:{Math.round(lowTemp)}°</p>
        </div>
      </div>

      <SearchBox 
        searchField={searchField}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />

      <HourlyForecast hourly={hourly} />

      <Forecast forecast={forecast} />
    </div>
  );
}

export default App;
