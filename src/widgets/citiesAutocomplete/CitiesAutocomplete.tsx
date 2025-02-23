import React, {memo} from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {CitiesAutocompleteProps, City} from './types';
import {useCitiesAutocomplete} from './useCitiesAutocomplete';
import {CityItem} from './components';

function CitiesAutocomplete(props: CitiesAutocompleteProps) {
  const {cities, query, onChangeText, onCityPress, isLoading} =
    useCitiesAutocomplete(props.onChooseCity);

  const renderItem = ({item}: {item: City}) => {
    return (
      <CityItem
        lat={item.lat}
        lon={item.lon}
        name={item.name}
        displayName={item.display_name}
        onCityPress={onCityPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a city"
        value={query}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {isLoading ? (
        <View style={styles.listLoadingState}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={cities}
          keyExtractor={item => item.place_id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    padding: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  item: {
    paddingVertical: 10,
  },
  list: {
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  listLoadingState: {
    paddingVertical: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
});

export default memo(CitiesAutocomplete);
