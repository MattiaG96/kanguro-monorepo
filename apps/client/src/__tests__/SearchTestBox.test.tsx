import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { SearchBox } from '../components/Inputs/SearchBox';
import { GeocodingModel } from '../models/GeocodingModel';

it('SearchTestBox.tsx - render', () => {
  render(
    <SearchBox
      id="unit-testing-search-box"
      searchValue=""
      searchOnChange={() => vi.fn()}
      setMapCenter={() => vi.fn()}
    />,
  );

  const element = document.getElementById('unit-testing-search-box');
  expect(element).not.toBeNull();
});

it('SearchTestBox.tsx - onSearch', async () => {
  const responseData: GeocodingModel = {
    features: [
      {
        geometry: {
          coordinates: [1, 1],
        },
      },
    ],
  };
  const fetchMockResponse = () =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(responseData),
    } as Response);
  vi.spyOn(global, 'fetch').mockImplementation(fetchMockResponse);

  const setMapCenter = vi.fn().mockImplementation(() => undefined);

  render(
    <SearchBox
      id="unit-testing-search-box"
      searchValue=""
      searchOnChange={() => vi.fn()}
      setMapCenter={setMapCenter}
    />,
  );

  const element = document.getElementById('search-box-search-button');
  if (!element) return;
  act(() => fireEvent.click(element));

  await waitFor(() => expect(setMapCenter).toHaveBeenCalledWith([1, 1]));
});
