import { useQuery } from 'react-query';

export const useGetWeather = (city) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=3&aqi=no&alerts=yes`;

  return useQuery(['data', city], async () => {
      const res = await fetch(url);
      if(!res.ok) {
        throw new Error('There was a problem with the Fetch operation:')
      }
      
      return res.json() 
  })
}