import { it, vi } from 'vitest';
import { setMapCenterUtility } from '../utils/MapUtils';
import { waitFor } from '@testing-library/dom';

it('MapUtils.ts - setMapCenterUtility', () => {
  vi.resetAllMocks();
  const mockGeolocation = {
    getCurrentPosition: vi.fn().mockReturnValueOnce({
      coords: {
        latitude: 1,
        longitude: 1,
        accuracy: 1,
      },
      timestamp: 0,
    }),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };
  global.navigator = {
    ...global.navigator,
    geolocation: mockGeolocation,
  };

  vi.spyOn(
    global.navigator.geolocation,
    'getCurrentPosition',
  ).mockImplementationOnce((success) => {
    Promise.resolve(
      success({
        coords: {
          latitude: 1,
          longitude: 1,
          accuracy: 1,
          altitude: 1,
          heading: 1,
          speed: 1,
          altitudeAccuracy: 1,
        },
        timestamp: 1,
      }),
    );
  });

  const setMapCenter = vi.fn();
  setMapCenterUtility(setMapCenter);

  waitFor(() => {
    expect(setMapCenter).toHaveBeenCalledWith([1, 1]);
  });
});
