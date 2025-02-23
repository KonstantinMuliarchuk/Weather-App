import {useCallback, useState} from 'react';
import {WeatherData} from './types';

const baseUrl = 'http://api.weatherapi.com/v1';
const paths = {
  currentWeather: '/current.json',
  forecast: '/forecast.json',
};
const apiKey = '6ba074c73a8a4457936181745252102';

export const useHomeScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const onChooseCity = useCallback(async (lat: string, lon: string) => {
    const params = `?key=${apiKey}&q=${lat},${lon}`;

    try {
      const response = await fetch(baseUrl + paths.forecast + params);
      const data: WeatherData = await response.json();
      console.log('Fetching weather ', data);
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      console.log('Fetching weather failed');
    }
  }, []);

  return {weatherData, onChooseCity};
};
