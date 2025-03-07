import {useCallback, useEffect, useRef, useState} from 'react';
import {City} from './types';
import {Alert} from 'react-native';
import {abortRequest, fetchWithTimeout} from '../../services';

const BASE_API_URL = 'https://nominatim.openstreetmap.org/search';
const REQUEST_KEY = 'citiesRequest';

export const useCitiesAutocomplete = (
  onChooseCity: (_lat: string, _lon: string) => void,
) => {
  const [query, setQuery] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isCityChosen = useRef(false);

  const onChangeText = useCallback((text: string) => {
    isCityChosen.current = false;
    if (text.length < 2) {
      setIsLoading(false);
    }
    setQuery(text);
  }, []);

  useEffect(() => {
    if (query.length < 2 || isCityChosen.current) return;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const url = `${BASE_API_URL}?city=${query}&format=json&limit=5&accept-language=en`;
        const data = await fetchWithTimeout<City[]>(
          url,
          undefined,
          3000,
          REQUEST_KEY,
        );
        setCities(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // avoid showing alert in case if request was canceled
        if (error instanceof Error && error.name === 'AbortError') return;
        Alert.alert('Error', `${error}`);
      }
    };
    fetchCities();

    return () => {
      // cancel request in case we have new query value or screen unmounts
      abortRequest(REQUEST_KEY);
    };
  }, [query]);

  const onCityPress = useCallback(
    (name: string, lat: string, lon: string) => {
      isCityChosen.current = true;
      setQuery(name);
      onChooseCity(lat, lon);
      setCities([]);
    },
    [onChooseCity],
  );

  return {
    cities,
    onChangeText,
    query,
    onCityPress,
    isLoading,
  };
};
