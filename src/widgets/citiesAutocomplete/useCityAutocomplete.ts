import {useCallback, useEffect, useRef, useState} from 'react';
import {City} from './types';

export const useCityAutocomplete = (
  onChooseCity: (_lat: string, _lon: string) => void,
) => {
  const [query, setQuery] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const isCityChosen = useRef(false);

  const handleOnChangeText = useCallback((text: string) => {
    isCityChosen.current = false;
    setQuery(text);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (query.length < 2 || isCityChosen.current) return;

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${query}&format=json&limit=5&accept-language=en`,
        );
        const data: City[] = await response.json();
        // Only update if component is still mounted
        if (isMounted) {
          console.log('!!! citites ', data);
          setCities(data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();

    return () => {
      isMounted = false;
    };
  }, [query]);

  const onCityPress = useCallback(
    (name: string, lat: string, lon: string) => {
      console.log('!!! onCityPress lat, lon', name, lat, lon);

      isCityChosen.current = true;
      setQuery(name);
      onChooseCity(lat, lon);
      setCities([]);
    },
    [onChooseCity],
  );

  return {
    cities,
    handleOnChangeText,
    query,
    onCityPress,
  };
};
