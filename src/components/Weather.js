import SearchBox from './SearchBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';

const Weather = ({ data, searchField, handleChange, handleSearch, handleAddToFavorites }) => {
  return (
    <Box
      className='stats'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      {data && (
        <>
          <Typography variant='h4' className='location'>
            {data.location.name}
          </Typography>
          <Typography variant='h1' className='main-temp'>
            {Math.round(data.current.temp_f)}°
          </Typography>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography id='description'>{data.current.condition.text}</Typography>
            <img src={data.current.condition.icon} alt='weather condition' />
          </Box>
          <Box display='flex' justifyContent='space-between' gap='10px'>
            <Typography>H:{Math.round(data.forecast.forecastday[0].day.maxtemp_f)}°</Typography>
            <Typography>L:{Math.round(data.forecast.forecastday[0].day.mintemp_f)}°</Typography>
          </Box>
        </>
      )}
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleAddToFavorites}>
          <FavoriteBorderIcon id='favorite-icon' />
        </IconButton>
        <Typography variant='body1'>Favorite</Typography>
      </Box>
      <SearchBox
        searchField={searchField}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
    </Box>
  );
}

export default Weather