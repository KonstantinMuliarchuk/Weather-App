export type CityItemProps = {
  name: string;
  displayName: string;
  onCityPress: (_name: string, _lat: string, _lon: string) => void;
  lat: string;
  lon: string;
};
