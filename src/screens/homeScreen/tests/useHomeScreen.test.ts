import {renderHook, act} from '@testing-library/react-hooks';
import {useHomeScreen} from '../useHomeScreen';
import {WeatherData} from '../types';

global.fetch = jest.fn();

describe('useHomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data and update state on successful fetch', async () => {
    const mockWeatherData: WeatherData = {
      location: {
        name: 'New York',
        region: 'NY',
        country: 'USA',
        localtime: '',
      },
      current: {
        temp_c: 20,
        condition: {text: 'Sunny', icon: ''},
        feelslike_c: 0,
        time: 0,
        humidity: 0,
        wind_kph: 0,
      },
      forecast: {forecastday: []},
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockWeatherData),
    });

    const {result} = renderHook(() => useHomeScreen());

    await act(async () => {
      await result.current.onChooseCity('40.7128', '-74.0060');
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/forecast.json?key=6ba074c73a8a4457936181745252102&q=40.7128,-74.0060',
    );
    expect(result.current.weatherData).toEqual(mockWeatherData);
  });

  it('should handle fetch error and not update state', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const {result} = renderHook(() => useHomeScreen());

    await act(async () => {
      await result.current.onChooseCity('40.7128', '-74.0060');
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/forecast.json?key=6ba074c73a8a4457936181745252102&q=40.7128,-74.0060',
    );
    expect(result.current.weatherData).toBeUndefined();
  });
});
