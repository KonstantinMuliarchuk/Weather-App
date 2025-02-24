export type Weather = {
  temp_c: number;
  feelslike_c: number;
  condition: {
    text: string;
    icon: string;
  };
  time: number | Date;
  humidity: number;
  wind_kph: number;
};

type Location = {
  country: string;
  localtime: string;
  name: string;
  region: string;
};

type Forecast = {
  forecastday: ForecastDay[];
};

type ForecastDay = {
  day: {
    maxtemp_c: number;
    mintemp_c: number;
  };
  hour: Weather[];
};

export type WeatherData = {
  current: Weather;
  location: Location;
  forecast: Forecast;
};
