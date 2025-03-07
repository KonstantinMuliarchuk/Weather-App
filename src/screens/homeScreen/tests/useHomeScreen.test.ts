import {renderHook, act} from '@testing-library/react-hooks';
import {useHomeScreen} from '../useHomeScreen';
import {WeatherData} from '../types';
import {fetchWithTimeout} from '../../../services';

jest.mock('../../../services', () => ({
  fetchWithTimeout: jest.fn(),
  abortRequest: jest.fn(),
}));
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

    (fetchWithTimeout as jest.Mock).mockResolvedValueOnce(mockWeatherData);

    const {result} = renderHook(() => useHomeScreen());

    await act(async () => {
      await result.current.onChooseCity('40.7128', '-74.0060');
    });

    expect(fetchWithTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.weatherData).toEqual(mockWeatherData);
  });

  it('should handle fetch error and not update state', async () => {
    (fetchWithTimeout as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );

    const {result} = renderHook(() => useHomeScreen());

    await act(async () => {
      await result.current.onChooseCity('40.7128', '-74.0060');
    });

    expect(fetchWithTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.weatherData).toBeUndefined();
  });
});
