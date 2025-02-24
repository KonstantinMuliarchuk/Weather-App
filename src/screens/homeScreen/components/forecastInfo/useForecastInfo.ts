import {useMemo} from 'react';
import {Weather} from '../../types';

export const useForecastInfo = (hours: Weather[]) => {
  return useMemo(() => {
    const currentTime = new Date().getTime();
    console.log('currentTime', currentTime);

    return hours
      .filter(hour => {
        console.log(
          'new Date(hour.time).getTime()',
          new Date(hour.time).getTime(),
        );

        return new Date(hour.time).getTime() >= currentTime;
      })
      .slice(0, 5)
      .map(hour => ({
        key: hour.time,
        time: new Date(hour.time).getHours(),
        icon: `https:${hour.condition.icon}`,
        temperature: hour.temp_c,
      }));
  }, [hours]);
};
