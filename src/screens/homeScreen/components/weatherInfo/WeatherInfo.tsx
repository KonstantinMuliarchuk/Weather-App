import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../../ui';
import {WeatherInfoProps} from './types';

function WeatherInfo(props: WeatherInfoProps) {
  return (
    <View style={styles.weatherContainer}>
      <Typography style={styles.centerText} type="h2">
        {props.cityName}
      </Typography>
      <Typography style={styles.centerText} type="h2">
        {props.countryName}
      </Typography>
      <Typography type="h1">{props.temperature}°</Typography>
      <Typography type="h4">Humidity: {props.humidity}%</Typography>
      <Typography style={styles.centerText} type="h2">
        {props.weatherDescription}
      </Typography>
      <Typography type="h4">Wind: {props.wind} m/s</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    marginTop: 60,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default WeatherInfo;
