import {useCallback, useEffect, useRef, useState} from 'react';
import {City} from './types';
import {Alert} from 'react-native';

const BASE_API_URL = 'https://nominatim.openstreetmap.org/search';

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
    let isLatest = true;
    if (query.length < 2 || isCityChosen.current) return;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}?city=${query}&format=json&limit=5&accept-language=en`,
        );
        const data: City[] = await response.json();
        // Only update after latest request has response
        if (isLatest) {
          setCities(data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error', 'Could not fetch cities');
      }
    };
    fetchCities();

    return () => {
      isLatest = false;
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
