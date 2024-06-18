import { it, vi } from 'vitest';
import { GeocodingModel } from '../models/GeocodingModel';
import { searchAddress } from '../utils/GeocodingUtils';
import { waitFor } from '@testing-library/dom';

it('GeocodingUtils.ts - searchAddress', async () => {
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
  const flyTo = vi.fn().mockImplementation(() => undefined);

  searchAddress('Unit testing address', setMapCenter, flyTo);

  await waitFor(() => {
    expect(setMapCenter).toHaveBeenCalled();
    expect(flyTo).toHaveBeenCalled();
  });
});

it('GeocodingUtils.ts - searchAddress flyTo not provided', async () => {
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
  window.alert = vi.fn();
  const setMapCenter = vi.fn().mockImplementation(() => undefined);

  searchAddress('Unit testing address', setMapCenter);

  await waitFor(() => {
    expect(setMapCenter).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});

it('GeocodingUtils.ts - searchAddress error fetch', async () => {
  const fetchMockResponse = () =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.reject({}),
    } as Response);
  vi.spyOn(global, 'fetch').mockImplementation(fetchMockResponse);
  window.alert = vi.fn();
  const setMapCenter = vi.fn().mockImplementation(() => undefined);

  searchAddress('Unit testing address', setMapCenter);

  await waitFor(() => {
    expect(setMapCenter).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
