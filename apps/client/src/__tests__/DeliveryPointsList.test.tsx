import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { DeliveryPointsList } from '../components/DeliveryPointsList';
import { Point } from '../models/PointsModel';

const userLocation: number[] = [1, 1];

const points: Point[] = [
  {
    id: 0,
    name: 'a',
    longitude: '1',
    latitude: '1',
    address: 'a',
    schedule: 'a',
  },
  {
    id: 1,
    name: 'b',
    longitude: '1',
    latitude: '1',
    address: 'b',
    schedule: 'b',
  },
];

it('DeliveryPointsList.tsx - render', async () => {
  render(
    <DeliveryPointsList
      userLocation={userLocation}
      pointsList={points}
      selectDeliveryPoint={() => vi.fn()}
    />,
  );

  const element = document.getElementById('0');
  waitFor(() => expect(element).not.toBeNull());
});

it('DeliveryPointsList.tsx - handleChoosePoint', async () => {
  const spyFn = vi.fn().mockImplementation(() => undefined);
  render(
    <DeliveryPointsList
      userLocation={userLocation}
      pointsList={points}
      selectDeliveryPoint={spyFn}
    />,
  );

  const element = document.getElementById('0');
  if (!element) return;

  act(() => fireEvent.click(element));

  await waitFor(() => expect(spyFn).toHaveBeenCalled());
});
