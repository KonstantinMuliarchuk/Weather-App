import {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Typography} from '../../../ui';
import {CityItemProps} from './types';

function CityItem(props: CityItemProps) {
  const onCityPress = useCallback(() => {
    props.onCityPress(props.name, props.lat, props.lon);
  }, [props]);
  return (
    <TouchableOpacity onPress={onCityPress} style={styles.item}>
      <Typography type="h4">{props.displayName}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
});

export default memo(CityItem);
