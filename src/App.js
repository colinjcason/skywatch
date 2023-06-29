import { useState, useEffect } from 'react'
import SearchBox from './components/search-box/SearchBox';
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

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = () => {    
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchField}&days=1&aqi=no&alerts=no`)
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
    })    
  }

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleSearch = () => {   
    getWeather() 
  }

  return (
    <div className="App">
      <div>
        {
          <div>
            <p>{location}</p>
            <p>{hiTemp}</p>
            <p>{lowTemp}</p>
            <p>{currentTemp}</p>
            <p>{description}</p>
            {/* {forecast.map(data => (
              <p>{data.day.avgtemp_f}</p>
            ))} */}
          </div>
        }
      </div>
      <SearchBox 
          searchField={searchField}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
    </div>
  );
}

export default App;
