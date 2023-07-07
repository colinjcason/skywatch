import { useState, useEffect } from 'react'
import SearchBox from './components/search-box/SearchBox';
import Forecast from './components/forecast-card/Forecast';
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
  const [searchField, setSearchField] = useState('san diego')
  const [selectedTheme, setSelectedTheme] = useState('dark')

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = () => {    
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchField}&days=3&aqi=no&alerts=no`)
    .then(res => res.json())
    .then(data => {
      setWeatherData(data)
      setCurrentTemp(data.current.temp_f)
      setDescription(data.current.condition.text)
      setIcon(data.current.condition.icon)
      setHiTemp(data.forecast.forecastday[0].day.maxtemp_f)
      setLowTemp(data.forecast.forecastday[0].day.mintemp_f)
      setForecast(data.forecast.forecastday)
      setLocation(data.location.name)
      setSearchField('')
      console.log(data)      
    })
  }

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleSearch = () => {   
    getWeather() 
  }

  const handleThemeSelection = (event) => {
    const theme = event.target.getAttribute('data-theme');
    document.documentElement.setAttribute("data-selected-theme", theme)
    setSelectedTheme(theme);
  }

  return (
    <div className="App">
      <div className='theme-switcher'>
        <button data-theme='light' onClick={handleThemeSelection}>Light</button>
        <button data-theme='dark' onClick={handleThemeSelection}>Dark</button>
      </div>

      <div className='stats'> 
            <h2 className='location'>{location}</h2>
            <h1 className='main-temp'>{Math.round(currentTemp)}°</h1>
            <p id='description'>{description}</p>
            <div className='hi-lo'>
              <p>H:{Math.round(hiTemp)}°</p>
              <p>L:{Math.round(lowTemp)}°</p>
            </div>
            {/* {forecast.map(data => (
              <p>{data.day.avgtemp_f}</p>
            ))} */}
      </div>

      <SearchBox 
          searchField={searchField}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />

        <Forecast forecast={forecast} />
    </div>
  );
}

export default App;
