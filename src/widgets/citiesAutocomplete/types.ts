export type CitiesAutocompleteProps = {
  onChooseCity: (_lat: string, _lon: string) => void;
};

export type City = {
  place_id: number;
  display_name: string;
  name: string;
  lat: string;
  lon: string;
};
