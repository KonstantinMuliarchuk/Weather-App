import {useCallback, useEffect, useState} from 'react';
import {WeatherData} from './types';
import {Alert} from 'react-native';
import {abortRequest, fetchWithTimeout} from '../../services';

const baseUrl = 'http://api.weatherapi.com/v1';
const routes = {
  currentWeather: '/current.json',
  forecast: '/forecast.json',
};
// should be stored in the .env file and NOT included into git.
// But for this case i will left it here to make it possible to test the app
const apiKey = '6ba074c73a8a4457936181745252102';

const REQUEST_KEY = 'homeScreenRequest';

export const useHomeScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const onChooseCity = useCallback(async (lat: string, lon: string) => {
    const params = `?key=${apiKey}&q=${lat},${lon}`;
    const url = baseUrl + routes.forecast + params;

    try {
      const data = await fetchWithTimeout<WeatherData>(
        url,
        undefined,
        3000,
        REQUEST_KEY,
      );
      setWeatherData(data);
    } catch (error) {
      // avoid showing alert in case if request was canceled
      if (error instanceof Error && error.name === 'AbortError') return;
      Alert.alert('Error', 'Could not fetch weather data');
    }
  }, []);

  useEffect(() => {
    // cleanup function
    return () => {
      // cancel fetch request in case component unmounts
      abortRequest(REQUEST_KEY);
    };
  }, []);

  return {weatherData, onChooseCity};
};
