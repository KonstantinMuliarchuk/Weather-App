import {useCallback, useState} from 'react';
import {WeatherData} from './types';
import {Alert} from 'react-native';

const baseUrl = 'http://api.weatherapi.com/v1';
const routes = {
  currentWeather: '/current.json',
  forecast: '/forecast.json',
};
// should be stored in the .env file
const apiKey = '6ba074c73a8a4457936181745252102';

export const useHomeScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const onChooseCity = useCallback(async (lat: string, lon: string) => {
    const params = `?key=${apiKey}&q=${lat},${lon}`;

    try {
      const response = await fetch(baseUrl + routes.forecast + params);
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      Alert.alert('Error', 'Could not fetch weather data');
    }
  }, []);

  return {weatherData, onChooseCity};
};
