import { it, vi } from 'vitest';
import { DEFAULT_COORDINATES } from '../utils/MapUtils';
import { getDeliveryPoints } from '../utils/PointUtils';
import { API } from '../network/API';
import { Point } from '../models/PointsModel';
import { waitFor } from '@testing-library/dom';

const pointsList: Point[] = [
  {
    id: 1,
    name: 'a',
    longitude: '1',
    latitude: '1',
    address: 'a',
    schedule: 'a',
  },
  {
    id: 2,
    name: 'b',
    longitude: '1',
    latitude: '1',
    address: 'b',
    schedule: 'b',
  },
];

it('PointUtils.ts - getDeliveryPoints', async () => {
  const setDeliveryPoints = vi.fn();
  const currentLocation = DEFAULT_COORDINATES;

  vi.spyOn(API, 'getPoints').mockReturnValueOnce(Promise.resolve(pointsList));

  getDeliveryPoints(setDeliveryPoints, currentLocation);

  await waitFor(() =>
    expect(setDeliveryPoints).toHaveBeenCalledWith(pointsList),
  );
});

it('PointUtils.ts - getDeliveryPoints error', async () => {
  const setDeliveryPoints = vi.fn();
  const currentLocation = DEFAULT_COORDINATES;

  window.alert = vi.fn();

  vi.spyOn(API, 'getPoints').mockReturnValueOnce(Promise.reject({}));

  getDeliveryPoints(setDeliveryPoints, currentLocation);

  await waitFor(() => expect(window.alert).toHaveBeenCalled());
});

it('PointUtils.ts - getDeliveryPoints no current location provided', async () => {
  const setDeliveryPoints = vi.fn();

  getDeliveryPoints(setDeliveryPoints);

  await waitFor(() => expect(setDeliveryPoints).toHaveBeenCalledWith([]));
});
