import {renderHook, act} from '@testing-library/react-hooks';
import {useCitiesAutocomplete} from '../useCitiesAutocomplete';
import {fetchWithTimeout} from '../../../services';

jest.mock('../../../services', () => ({
  fetchWithTimeout: jest.fn(),
  abortRequest: jest.fn(),
}));

describe('useCitiesAutocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty query, cities, and isLoading=false', () => {
    const {result} = renderHook(() => useCitiesAutocomplete(jest.fn()));

    expect(result.current.query).toBe('');
    expect(result.current.cities).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should update query on text change', () => {
    const {result} = renderHook(() => useCitiesAutocomplete(jest.fn()));

    act(() => {
      result.current.onChangeText('New');
    });

    expect(result.current.query).toBe('New');
  });

  it('should not fetch cities for query shorter than 2 characters', async () => {
    const {result} = renderHook(() => useCitiesAutocomplete(jest.fn()));

    act(() => {
      result.current.onChangeText('N'); // One character, should not trigger fetch
    });

    expect(fetchWithTimeout).not.toHaveBeenCalled();
  });

  it('should fetch cities when query is at least 2 characters', async () => {
    (fetchWithTimeout as jest.Mock).mockImplementation(() => {
      return Promise.resolve([
        {
          display_name: 'New York, USA',
          lat: '40.7128',
          lon: '-74.0060',
        },
      ]);
    });

    const {result} = renderHook(() => useCitiesAutocomplete(jest.fn()));

    await act(async () => {
      result.current.onChangeText('New');
    });

    // Wait for the hook's state updates
    expect(fetchWithTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.cities.length).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle errors when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const {result} = renderHook(() => useCitiesAutocomplete(jest.fn()));

    act(() => {
      result.current.onChangeText('Los');
    });

    expect(result.current.cities).toEqual([]);
  });

  it('should call onChooseCity when a city is selected', () => {
    const onChooseCity = jest.fn();
    const {result} = renderHook(() => useCitiesAutocomplete(onChooseCity));

    act(() => {
      result.current.onCityPress('New York', '40.7128', '-74.0060');
    });

    expect(onChooseCity).toHaveBeenCalledWith('40.7128', '-74.0060');
    expect(result.current.query).toBe('New York');
    expect(result.current.cities).toEqual([]);
  });
});
