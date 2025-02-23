import {Image, StyleSheet, View} from 'react-native';
import {Weather} from '../../types';
import {Typography} from '../../../../ui';
import {useForecastData} from './useForecastData';

type Props = {
  hours: Weather[];
};
function ForecastData(props: Props) {
  const filteredHours = useForecastData(props.hours);

  return (
    <View style={styles.container}>
      <Typography type="h4">Forecast for next 5 hours</Typography>
      <View style={styles.contentContainer}>
        {filteredHours.map(hour => (
          <View style={styles.hour} key={hour.key}>
            <Typography type="h4">{hour.time}</Typography>
            <Image style={styles.icon} source={{uri: hour.icon}} />
            <Typography type="h4">{hour.temperature}°</Typography>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 6,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  hour: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  forecastText: {
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    height: 40,
    width: 40,
    marginVertical: 10,
    tintColor: 'black',
  },
});

export default ForecastData;
