import { useState, useEffect, useContext, useCallback } from 'react'
import SearchBox from './components/search-box/SearchBox';
import Forecast from './components/forecast-card/Forecast';
import HourlyForecast from './components/hourly-forecast/HourlyForecast';
import Switch from './components/theme-switcher/Switch'
import Sidebar from './components/sidebar/Sidebar';
import { Oval } from 'react-loader-spinner'
import './App.css';
import { UserContext } from './contexts/user.context';
import { useGetWeather } from './hooks/useGetWeather';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { addToFavorites } from './utils/firebase';

function App() {
  const { currentUser } = useContext(UserContext);
  const [theme, setTheme] = useState('light')
  const [searchField, setSearchField] = useState('')
  const [city, setCity] = useState('san diego')
  const { data, error, loading } = useGetWeather(city)

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleChange = useCallback((e) => {
    setSearchField(e.target.value)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchField) {
      alert('Please enter a location to search')
    } else {
      setCity(searchField);
      setSearchField('')
    }
  }

  const handleThemeSelection = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])

  const updateCity = (newCity) => {
    setCity(newCity); // Update the city state
  };

  const handleAddToFavorites = () => {
    currentUser ? addToFavorites(currentUser, city) : alert('Please sign in to use save function.')
  }

  return (
    <>
      <Sidebar updateCity={updateCity} />

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
          {/* <SignInButton /> */}

          {/* Light and dark theme switch */}
          <Switch handleThemeSelection={handleThemeSelection} theme={theme} />

          <div className='stats'>
            {data && (
              <>
                <h2 className='location'>{data.location.name}</h2>
                <h1 className='main-temp'>{Math.round(data.current.temp_f)}°</h1>
                <div className='description-container'>
                  <p id='description'>{data.current.condition.text}</p>
                  <img src={data.current.condition.icon} alt='weather condition' />
                </div>
                <div className='hi-lo'>
                  <p>H:{Math.round(data.forecast.forecastday[0].day.maxtemp_f)}°</p>
                  <p>L:{Math.round(data.forecast.forecastday[0].day.mintemp_f)}°</p>
                </div>
              </>
            )}

            <Box
              display='flex'
              alignItems='end'
              justifyContent='center'
            >
              <IconButton onClick={handleAddToFavorites}>
                <FavoriteBorderIcon
                  id='favorite-icon'
                  style={{ marginBottom: '-10px' }}
                />
              </IconButton>
              <Box sx={{ fontWeight: 'normal', textAlign: 'center' }}>Favorite</Box>
            </Box>

            <SearchBox
              searchField={searchField}
              handleChange={handleChange}
              handleSearch={handleSearch}
            />
          </div>

          <div className='forecast'>
            {data && (
              <>
                <HourlyForecast hourly={data.forecast.forecastday[0].hour} />
                <Forecast forecast={data.forecast.forecastday} />
              </>
            )}
          </div>
        </div>
      }
    </>
  );
}

export default App;
