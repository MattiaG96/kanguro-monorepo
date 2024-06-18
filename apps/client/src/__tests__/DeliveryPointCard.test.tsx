import { it, vi } from 'vitest';
import { DeliveryPointCard } from '../components/DeliveryPointCard';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Point } from '../models/PointsModel';

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

it('DeliveryPointCard.tsx - render', () => {
  render(
    <DeliveryPointCard id="unit-test-delivery-point-card" point={points[0]} />,
  );
  const element = document.getElementById('unit-test-delivery-point-card');
  expect(element).not.toBeNull();
});

it('DeliveryPointCard.tsx - handleChoosePoint', () => {
  const spyFn = vi.fn().mockImplementation(() => undefined);
  render(
    <DeliveryPointCard
      id="unit-test-delivery-point-card"
      point={points[0]}
      handleChoosePoint={spyFn}
    />,
  );
  const element = document.getElementById('unit-test-delivery-point-card');

  if (!element) return;
  act(() => fireEvent.click(element));

  expect(spyFn).toHaveBeenCalled();
});

it('DeliveryPointCard.tsx - postMessage', async () => {
  let message = '';
  window.addEventListener('message', (event) => {
    if (event.data.point) {
      message = event.data.point;
    }
  });
  render(
    <DeliveryPointCard
      id="unit-test-delivery-point-card"
      point={points[0]}
      selectedPoint={points[0]}
    />,
  );
  const element = document.getElementById(
    'delivery-point-card-selecet-button-0',
  );

  if (!element) return;
  act(() => fireEvent.click(element));

  await waitFor(() => expect(message).toStrictEqual(points[0]));
});
