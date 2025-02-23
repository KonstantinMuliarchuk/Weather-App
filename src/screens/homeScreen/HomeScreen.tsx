import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useHomeScreen} from './useHomeScreen';
import {CitiesAutocomplete} from '../../widgets/citiesAutocomplete';
import {WeatherData, ForecastData} from './components';
import {Typography} from '../../ui';

const HomeScreen: React.FC = () => {
  const {weatherData, onChooseCity} = useHomeScreen();

  return (
    <View style={styles.container}>
      {weatherData ? (
        <WeatherData
          cityName={weatherData.location.name}
          countryName={weatherData.location.country}
          temperature={weatherData.current.temp_c}
          humidity={weatherData.current.humidity}
          weatherDescription={weatherData.current.condition.text}
          wind={weatherData.current.wind_kph}
        />
      ) : (
        <View style={styles.descriptionContainer}>
          <Typography style={styles.centeredText} type="h2">
            Choose a city to see the weather and forecast data.
          </Typography>
        </View>
      )}

      {weatherData ? (
        <ForecastData hours={weatherData.forecast.forecastday[0].hour} />
      ) : null}

      <CitiesAutocomplete onChooseCity={onChooseCity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  descriptionContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 60,
  },
  centeredText: {
    textAlign: 'center',
  },
});

export default HomeScreen;
