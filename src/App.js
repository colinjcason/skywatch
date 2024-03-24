import { useState, useEffect, useContext, useCallback } from 'react'
import Forecast from './components/forecast-card/Forecast';
import HourlyForecast from './components/hourly-forecast/HourlyForecast';
import Sidebar from './components/sidebar/Sidebar';
import { Oval } from 'react-loader-spinner'
import './App.css';
import { UserContext } from './contexts/user.context';
import { useGetWeather } from './hooks/useGetWeather';
import { Box } from '@mui/material';
import { addToFavorites } from './utils/firebase';
import Weather from './components/Weather';
import MaterialUISwitch from './components/MaterialUISwitch';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const { currentUser } = useContext(UserContext);
  const [theme, setTheme] = useState('light')
  const [searchField, setSearchField] = useState('')
  const [city, setCity] = useState('san diego')
  const { data, isError, isLoading } = useGetWeather(city)

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

  if (isError) return <Box>Error fetching data</Box>;

  return (
    <>
      <Sidebar updateCity={updateCity} />

      {/* Loading animation */}
      {isLoading ?
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
          {/* Light and dark theme switch */}
          <FormControlLabel
            control={<MaterialUISwitch
              sx={{ m: 1 }}
              onClick={handleThemeSelection}
            // className='switch'
            />}
          />

          <Weather
            data={data}
            theme={theme}
            searchField={searchField}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleAddToFavorites={handleAddToFavorites}
          />

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
