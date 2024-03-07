import { useState, useEffect } from 'react'
import SearchBox from './components/search-box/SearchBox';
import Forecast from './components/forecast-card/Forecast';
import HourlyForecast from './components/hourly-forecast/HourlyForecast';
import Switch from './components/theme-switcher/Switch'
import SignInButton from './components/sign-in-button/SignInButton';
import { Oval } from 'react-loader-spinner'
import './App.css';

function App() {
  const [location, setLocation] = useState('')
  const [currentTemp, setCurrentTemp] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [hiTemp, setHiTemp] = useState('')
  const [lowTemp, setLowTemp] = useState('')
  const [forecast, setForecast] = useState([])
  const [hourly, setHourly] = useState([])
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)
  const [searchField, setSearchField] = useState('san diego')

  const getWeather = () => {
    setLoading(true)
    if (!searchField) {
      alert('Please enter a city for weather data.')
      setLoading(false)
    } else {
      return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchField}&days=3&aqi=no&alerts=yes`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then(data => {
          setCurrentTemp(data.current.temp_f)
          setDescription(data.current.condition.text)
          setIcon(data.current.condition.icon)
          setHiTemp(data.forecast.forecastday[0].day.maxtemp_f)
          setLowTemp(data.forecast.forecastday[0].day.mintemp_f)
          setForecast(data.forecast.forecastday)
          setHourly(data.forecast.forecastday[0].hour)
          setLocation(data.location.name)
          setSearchField('')
          setLoading(false)
        })
        .catch(error => {
          alert('Please enter a valid city name.')
          setSearchField('')
          console.error('There was a problem with the Fetch operation:', error)
        })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getWeather()
    }, 1000)
  }, [])


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  const handleSearch = () => {

    getWeather()
  }

  const handleThemeSelection = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <>
      {/* Loading animation */}
      {loading ?
        <Oval
          height={160}
          width={160}
          color={theme === 'light' ? '#2b2e4a' : 'rgb(234, 56, 141)'}
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor={theme === 'light' ? "#f0e5e4" : 'rgb(123, 91, 199)'}
          strokeWidth={2.5}
          strokeWidthSecondary={2.5}
        /> :

        <div className={`App ${theme}`}>
          {/* Sign in button */}
          <SignInButton />

          {/* Light and dark theme switch */}
          <Switch handleThemeSelection={handleThemeSelection} theme={theme} />

          <div className='stats'>
            <h2 className='location'>{location}</h2>
            <h1 className='main-temp'>{Math.round(currentTemp)}°</h1>
            <div className='description-container'>
              <p id='description'>{description}</p>
              <img src={icon} alt='weather condition' />
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

          <div className='grid-forecast'>
            <HourlyForecast hourly={hourly} />

            <Forecast forecast={forecast} />
          </div>

        </div>
      }
    </>
  );
}

export default App;
