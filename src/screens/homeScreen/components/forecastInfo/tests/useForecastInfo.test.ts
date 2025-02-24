import {renderHook} from '@testing-library/react-hooks';
import {useForecastInfo} from '../useForecastInfo';
import {Weather} from '../../../types';

describe('useForecastInfo', () => {
  it('should return only future forecast data (max 5 items)', () => {
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    const futureTime1 = new Date(currentTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour ahead
    const futureTime2 = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours ahead
    const futureTime3 = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000);
    const futureTime4 = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000);
    const futureTime5 = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000);
    const futureTime6 = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours ahead

    const mockWeatherData: Weather[] = [
      {
        time: pastTime,
        condition: {
          icon: '/past.png',
          text: '',
        },
        temp_c: 15,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime1,
        condition: {
          icon: '/future1.png',
          text: '',
        },
        temp_c: 20,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime2,
        condition: {
          icon: '/future2.png',
          text: '',
        },
        temp_c: 21,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime3,
        condition: {
          icon: '/future3.png',
          text: '',
        },
        temp_c: 22,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime4,
        condition: {icon: '/future4.png', text: ''},
        temp_c: 23,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime5,
        condition: {icon: '/future5.png', text: ''},
        temp_c: 24,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: futureTime6,
        condition: {icon: '/future6.png', text: ''},
        temp_c: 25,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
    ];

    const {result} = renderHook(() => useForecastInfo(mockWeatherData));

    expect(result.current.length).toBe(5);
    expect(result.current[0].time).toBe(futureTime1.getHours());
    expect(result.current[0].icon).toBe('https:/future1.png');
    expect(result.current[0].temperature).toBe(20);
  });

  it('should return an empty array if all hours are in the past', () => {
    const pastTime1 = new Date(new Date().getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    const pastTime2 = new Date(new Date().getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

    const mockWeatherData: Weather[] = [
      {
        time: pastTime1,
        condition: {icon: '/past1.png', text: ''},
        temp_c: 15,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
      {
        time: pastTime2,
        condition: {icon: '/past2.png', text: ''},
        temp_c: 16,
        feelslike_c: 0,
        humidity: 0,
        wind_kph: 0,
      },
    ];

    const {result} = renderHook(() => useForecastInfo(mockWeatherData));

    expect(result.current).toEqual([]);
  });
});
